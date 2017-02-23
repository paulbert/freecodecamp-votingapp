
function pollsDAO (db,testUsers) {
	
	var collection = 'polls';
	
	function upsert(poll,pollLink,user,callback) {
		function makeLink(titleArr,attempt) {
			var linkString = titleArr.reduce(function(linkString,val,ind) {
				if(ind < attempt) {
					if(linkString.length < 15) {
						return linkString + val;
					}
					if(linkString.indexOf(attempt) === -1) {
						return linkString + attempt;
					}
				}
				return linkString;
			});
			db.collection(collection).findOne({link:linkString},function(err,document) {
				if(document) {
					return makeLink(titleArr,attempt + 1);
				}
				insert(linkString);
			});
		}
		
		function insert(linkString) {
			console.log('Inserting new poll titled: ' + poll.title);
			db.collection(collection).insert(Object.assign({},poll,{link:linkString,userId:user._id,userName:user.firstName,date:new Date(Date.now())}),callback);
		}
		
		if(pollLink === 'new') {
			makeLink(poll.title.split(' '),1);
		} else {
			console.log('Start update...');
			db.collection(collection).update({link:pollLink},Object.assign({},poll,{userId:user}),callback);
		}
	}
	
	function get(query,callback) {
		db.collection(collection).find(query,{'_id':0}).sort({'date': -1}).toArray(callback);		
	}
	
	function getOne(query,callback) {
		db.collection(collection).findOne(query,{'_id':0},callback);
	}
	
	function remove(query,callback) {
		db.collection(collection).remove(query,callback);
	}
	
	function vote(pollLink,vote,user,callback) {
		
		function updateVoteArray(err,poll) {
			if(err || !poll) {
				console.log(err);
				return callback('Error');
			}
			if(poll.votes) {
				var newUser = true,
					newVotes = [];
				newVotes = poll.votes.map(function(val) {
					if(val.user === user) {
						newUser = false;
						return Object.assign({},val,{vote:vote});
					}
					return val;
				});
				if(newUser) {
					newVotes = [].concat(poll.votes,{user:user,vote:vote});
				}
				console.log('Adding vote!');
				poll.votes = newVotes;
				db.collection(collection).update({link:pollLink},poll,callback);
			} else {
				console.log('First vote!');
				poll.votes = [{user:user,vote:vote}];
				db.collection(collection).update({link:pollLink},poll,callback);
			}
		}
		
		db.collection(collection).findOne({link:pollLink},updateVoteArray);
		
	}
	
	return {
		upsert:upsert,
		get:get,
		getOne:getOne,
		vote:vote,
		remove:remove
	}
	
}

module.exports = pollsDAO;