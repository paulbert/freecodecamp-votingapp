
function pollsDAO (db,testUsers) {
	
	var collection = 'polls';
	
	function upsert(poll,pollLink,user,callback) {
		function makeLink(titleArr,attempt) {
			console.log('Making link...');
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
			db.collection(collection).insert(Object.assign({},poll,{link:linkString,userId:user,date:new Date(Date.now())}),callback);
		}
		
		if(pollLink === 'new') {
			makeLink(poll.title.split(' '));
		} else {
			db.collection(collection).update({link:pollLink},Object.assign({},poll,{userId:user}),callback);
		}
	}
	
	function get(callback) {
		db.collection(collection).find({}).sort({'date': -1}).toArray(callback);		
	}
	
	function getOne(query,callback) {
		db.collection(collection).findOne(query,callback);
	}
	
	function vote(pollId,vote,user,callback) {
		
		function updateVoteArray(err,poll) {
			if(err || !poll) {
				console.log(err);
				return callback('Error');
			}
			if(poll.votes) {
				var newUser = true,
					newVotes = [];
				poll.votes.map(function(val) {
					if(val.user === user) {
						newUser = false;
						return Object.assign({},val,{vote:vote});
					}
					return val;
				});
				if(newUser) {
					newVotes = [].concat(poll.votes,{user:user,vote:vote});
				}
				poll.votes = newVotes;
				db.collection(collection).update({_id:pollId},poll,callback);
			}
		}
		
		db.collection(collection).findOne({_id:pollId},updateVoteArray);
		
	}
	
	return {
		upsert:upsert,
		get:get,
		getOne,
		vote:vote
	}
	
}

module.exports = pollsDAO;