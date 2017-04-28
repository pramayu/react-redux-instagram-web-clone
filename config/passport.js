var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var FacebookStrategy = require('passport-facebook').Strategy;
var users = require('../models/user');
var config = require('./main');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    users.findOne({id: jwt_payload.id}, function(err, user) {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
  }));

  // oAuth2

  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });
  //
  // passport.deserializeUser(function(id, done) {
  //   users.findById(id, function(err, user) {
  //     done(err, user);
  //   })
  // });
  //
  // passport.use(new FacebookStrategy({
  //     clientID: config.facebook.app_id,
  //     clientSecret: config.facebook.secret,
  //     callbackURL: config.facebook.callback,
  //     profileFields: ['id', 'name', 'email']
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     var username = profile.name.givenName;
  //     process.nextTick(function() {
  //       users.findOne({ 'facebookAuth._id': profile.id }, function(err, user) {
  //         if(err) {
  //           return done(err);
  //         }
  //         if(user) {
  //           return done(null, user);
  //         }
  //         else {
  //           var user = new users();
  //           user.facebookAuth._id = profile.id;
  //           user.facebookAuth.email = profile.emails[0].value
  //           user.facebookAuth.username = username.replace(/\s/g,'');
  //           user.facebookAuth.fullname = profile.name.givenName + ' ' + profile.name.familyName;
  //           user.facebookAuth.activation_token = accessToken;
  //           user.activated = true;
  //           user.save(function(err) {
  //             if(err)
  //               throw err;
  //             return done(null, user);
  //           })
  //         }
  //       })
  //     })
  //   }
  // ));

}
