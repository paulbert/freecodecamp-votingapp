
function usersDAO (db) {
	
	var collection = 'users';
	
	function insertNewUser(newUser,callback) {
		db.collection(collection).insert(newUser,callback);
	}
	
	function getUser(userId,callback) {
		db.collection(collection).findOne({fb_id:userId},{_id:-1},callback);
	}
	
	return {
		insert:insertNewUser,
		getOne:getUser
	}
	
}

module.exports = usersDAO;