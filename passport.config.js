
var FacebookStrategy = require('passport-facebook').Strategy,
	usersDAO = require('./routes/usersDAO.js')

module.exports = function(db,passport,configObj) {

	var Users = usersDAO(db);
	
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Users.getOne(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new FacebookStrategy(configObj,
		// facebook will send back the token and profile
		function(token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function() {
				Users.getOne(profile.id, function(err, user) {
					if (err) {
						return done(err);
					}

					// if the user is found, then log them in
					if (user) {
						return done(null, user); // user found, return that user
					} else {
						// if there is no user found with that facebook id, create them
						var newUser = {
							fb_id: profile.id,
							token: token,
							fullName: profile.name.givenName + ' ' + profile.name.familyName,
							firstName: profile.name.givenName
						};

						// save our user to the database
						Users.insert(newUser, function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}

				});
			});

		})
	);

};