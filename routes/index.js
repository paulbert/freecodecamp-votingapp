
var usersDAO = require('./usersDAO'),
	path = require('path'),
	pollsDAO = require('./pollsDAO'),
	sessionsDAO = require('./sessionsDAO'),
	crypto = require('crypto');
	
module.exports = exports = function(app,db) {
	
	var users = usersDAO(db),
		polls = pollsDAO(db),
		sessions = sessionsDAO(db),
		cookieTime = 30 * 24 * 3600000;
	
	function addResponseCookie(res,user,passcode) {
		res.cookie('user',user,{expires: new Date(Date.now() + cookieTime),httpOnly:false});
		res.cookie('passcode',passcode,{expires: new Date(Date.now() + cookieTime),httpOnly:false});
		res.set('Access-Control-Allow-Origin','*');
		res.set('Access-Control-Allow-Credentials','true');
	}
	
	function cookieCallback (err,newCookie,res) {
		//console.log(newCookie);
		if(err) {
			res.json({'message':err});
		} else {
			addResponseCookie(res,newCookie.user_id,newCookie.passcode);
			res.json({'message':'Success'});
		}
	}
	
	app.post('/signup', function(req,res) {
		var user = req.body;
		console.log(user);
		users.insertUser(user,function(err,newUser) {
			console.log('New User:');
			console.log(newUser);
			if(err) {
				res.json({'message':err});
			} else {
				sessions.insertNewSession(newUser.ops[0],function(err,newCookie) {
					console.log('Starting session...');
					cookieCallback(err,newCookie.ops[0],res);
				});
			}
		});
	});
	
	app.post('/login', function(req,res) {
		var user = req.body;
		users.checkPassword(user,function(err,passed) {
			if(passed) {
				sessions.insertNewSession(user,function(err,newCookie) {
					cookieCallback(err,newCookie.ops[0],res);
				});
			} else {
				res.json({'message':'Username or password do not match'});
			}
		});	
	});
	
	app.post('/savePoll', function(req,res) {
		console.log(req.body);
		var poll = req.body.poll,
			pollLink = req.body.pollLink || 'new',
			user = req.cookies.user;
		//console.log(user);
		user = 'test';
		sessions.checkCookie(req.cookies,function(foundCookie) {
			if(foundCookie) {
				polls.upsert(poll,pollLink,user,function(err,result) {
					console.log('Attempting upsert...');
					if(err) {
						console.log(err);
						res.json({'message':'Error'});
					} else {
						console.log('Poll upsert successful');
						res.json({'message':'Success'});
					}
				});
			} else {
				res.json({'message':'Unauthenticated'});
			}
		});
	});
	
	app.post('/vote', function(req,res) {
		var pollId = req.body.pollId,
			vote = req.body.vote,
			user = req.cookies.user || 'anonymous';
		
		polls.vote(pollId,vote,user,function(err,result) {
			if(err) {
				res.json({'message':'Error'});
			} else {
				res.json({'message':'Vote submitted'});
			}
		});
	});
	
	app.get('/polls', function(req,res) {
		polls.get(function(err,allPolls) {
			if(err) {
				res.json({'message':'Error. Try reloading page.'});
			} else {
				console.log('Got polls!');
				res.json(allPolls);
			}
		});
		
	});
	
	app.get('/onePoll', function(req,res) {
		var pollLink = req.query.pollLink;
		console.log('Getting ' + pollLink);
		if(pollLink) {
			polls.getOne({link:pollLink},function(err,poll) {
				if(err) {
					res.json({'message':'Error. Try reloading page.'});
				} else {
					if(poll) {
						console.log('Got ' + pollLink + '!');
						res.json(poll);
					} else {
						console.log('Poll not found');
						res.json({'message':'Poll not found'});
					}
				}
			});
		} else {
			console.log('No poll specified');
			res.json({'message':'No poll specified'});
		}
		
	});
	
	app.get('*', function(req,res) {
		/*
		sessions.checkCookie(req.cookies,function(foundCookie) {
			if(foundCookie) {
				app.set('username',req.cookies.user);
				res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
			} else {
				res.sendFile(path.join(__dirname + '/../builds/templates/login.html'));
			}
		});
		*/
		res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
	});
}