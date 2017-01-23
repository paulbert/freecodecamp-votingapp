
function usersDAO (db,testUsers) {
	
	var collection = 'users';
	
	function insertNewTrash(url,userId,callback) {
		db.collection(collection).insert({trash:url,userId:userId,date:new Date(Date.now())},callback);
	}
	
	function getTrash(callback) {
		
		var trashArray = [],
			userArray = [],
			currentUser = '';
		
		function findUser (user,ind,users) {
			return user._id === currentUser;
		}
		
		function appendUserToTrash (post,ind,trash) {
			currentUser = post.userId;
			thisUser = userArray.filter(findUser);
			//console.log(thisUser[0]);
			//console.log(trash);
			return Object.assign({},thisUser[0],post);
		}
		
		function trashUserJoin (err,users) {
			//console.log(users[0]);
			var joinedTrash = [];
			if(err) {
				callback(err);
			} else {
				userArray = users;
				joinedTrash = trashArray.map(appendUserToTrash);
				//console.log(joinedTrash[0]);
				callback(0,joinedTrash);
			}
		}
		
		function getUsers (err,trash) {
			//console.log(trash[0]);
			if(err) {
				callback(err);
			} else {
				trashArray = trash;
				db.collection(usersCollection).find({}).toArray(trashUserJoin);
			}
		}
		
		db.collection(collection).find({}).sort({'date': -1}).toArray(getUsers);
		
	}
	
	return {
		insertNewTrash:insertNewTrash,
		getTrash:getTrash
	}
	
}

module.exports = usersDAO;