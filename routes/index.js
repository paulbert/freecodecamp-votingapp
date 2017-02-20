
var usersDAO = require('./usersDAO'),
	path = require('path'),
	pollsDAO = require('./pollsDAO');
	
module.exports = exports = function(app,db) {
	
	var users = usersDAO(db),
		polls = pollsDAO(db);
	
	app.post('/savePoll', function(req,res) {
		console.log(req.body);
		var poll = req.body.poll,
			pollLink = req.body.pollLink || 'new',
			user = req.user;
		
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
	});
	
	app.post('/vote', function(req,res) {
		var pollLink = req.body.pollLink,
			vote = req.body.vote,
			user = req.user || req.cookies.anon_timestamp;
		
		polls.vote(pollLink,vote,user,function(err,result) {
			console.log('Adding vote to ' + pollLink);
			if(err) {
				console.log('Error');
				res.json({'message':'Error'});
			} else {
				console.log('Success!');
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