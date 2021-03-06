
var usersDAO = require('./usersDAO'),
	path = require('path'),
	pollsDAO = require('./pollsDAO');
	
module.exports = exports = function(app,db,passport) {
	
	var users = usersDAO(db),
		polls = pollsDAO(db);
		
	// Facebook login passport routes
	app.get('/auth/facebook', passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/' }));
		
	app.get('/userInfo',function(req,res) {
		console.log('The user is:');console.log(req.user);
		var jsonResponse = req.user || { empty: true };
		console.log(jsonResponse);
		res.json(jsonResponse);
	});
	
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	// End Facebook login routes
	
	app.post('/savePoll', function(req,res) {
		console.log(req.body);
		var poll = req.body.poll,
			pollLink = req.body.pollLink || 'new',
			user = req.user;
		
		if(user) {
			polls.upsert(poll,pollLink,user,function(err,result) {
				if(err) {
					console.log(err);
					res.json({'message':'There was a problem adding your poll.  Please try again.','class':'alert-danger'});
				} else {
					var resMessage = pollLink === 'new' ? 'Poll successfully added' : 'Poll successfully updated';
					res.json({'message':resMessage,'class':'alert-success'});
				}
			});
		} else {
			res.json({'message':'There was a problem adding your poll.  Please refresh the page and log back in.','class':'alert-danger'});
		}
	});
	
	app.post('/removePoll', function(req,res) {
		console.log(req.body);
		var pollQuery = req.body.pollQuery;
		
		console.log('Removing a poll...');
		polls.remove(pollQuery,function(err,numberOfRemovedDocs) {
			if(err) {
				console.log(err);
				res.json({'message':'Error'});
			} else {
				if(numberOfRemovedDocs < 1) {
					console.log('Did not find this poll',pollQuery);
					res.json({'message':'Not found'});
				} else {
					if(numberOfRemovedDocs > 1) {
						console.log('Deleted many polls with this query: ',pollQuery);
					}
					res.json({'message':'Success'});
				}
			}
		});
	});
	
	app.post('/vote', function(req,res) {
		var pollLink = req.body.pollLink,
			vote = req.body.vote,
			user = req.user ? req.user._id : req.cookies.anon_timestamp;
		
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
		var query = req.query.userOnly === 'true' ? {userId:req.user._id} : {};
		polls.get(query,function(err,allPolls) {
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