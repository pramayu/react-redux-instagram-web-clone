var express = require('express');
var passport = require('passport');
var app = express.Router();

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

app.get('/auth/facebook/current_user', isLoggin, function(req, res, next) {
  var user = {};
  user.username = req.user.facebookAuth.username;
  user.email = req.user.facebookAuth.email;
  user.id = req.user._id;
  res.json({user})
})

app.get('/*', function(req, res, next) {
  res.render('index', {title: '-'});
});

function isLoggin(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/signin')
  }
}


module.exports = app;
