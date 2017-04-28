var express = require('express');
var jwt = require('jsonwebtoken');
var app = express.Router();
var users = require('../models/user');
var config = require('../config/main');


// sempurnakan
app.post('/:token', function(req, res, next) {
  var token = req.params.token;
  users.findOne({ 'localAuth.activation_token': token }, '_id localAuth.email localAuth.username activated', function(err, user){
    var id = user._id;
    var username = user.localAuth.username;
    var email = user.localAuth.email;
    if(user){
      if(user.activated === true) {
        res.json({ errors: { form: 'This account is already activated, please log in.' } })
      } else {
        user.activated = true;
        user.save(function(err) {
          if(!err) {
            var token = jwt.sign({
              id: id,
              username: username,
              email: email
            }, config.secret);
            res.json({token})
          }
        })
      }
    }else {
      res.status(401).json({ errors: { form: 'Token is expired. Please re-send actiovation token.' } })
    }
  })
});


module.exports = app;
