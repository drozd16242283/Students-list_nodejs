var LocalStrategy = require('passport-local').Strategy;


var models = require('../models/user');
// Define the User model
var User = models.User;


module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
        console.log(user);
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user) {
            if (err) return cb(err);
            cb(err, user);
        });
    });

    // Signup
    passport.use('signup', new LocalStrategy({
        usernameField: 'usernameSignup',
        passwordField: 'passwordSignup',
        passReqToCallback: true
        },
        function(req, username, password, cb) {

            process.nextTick(function() {

                User.find(username, function(err, data) {
                    if (err) return cb(err);

                    if (data) {
                        return cb(null, false, { message: 'That login is already in use.' } );
                    } else {
                        User.newUser(username, password, function(err, user) {
                            if (err) throw err;

                            return cb(null, user);
                        });
                    }
                });
            })
        }
    ));

    // Signin
    passport.use('signin', new LocalStrategy( { passReqToCallback: true },
        function(req, username, password, cb) {
            User.find(username, function(err, user) {
                console.log(user);
                    if (err) return cb(err);
                    if (!user) return cb(null, false, { message: 'No user found.' } );
                    if (!user.validatePassword(password)) {
                        return cb(null, false, { message: 'Wrong password.' });
                }
                return cb(null, user);
            });
        }
    ));
};