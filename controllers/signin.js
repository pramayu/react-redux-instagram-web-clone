var express = require('express');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var users = require('../models/user');
var config = require('../config/main');
var app = express.Router();


function isValidate(data) {
  var errors = {};
  if(validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  if(validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}


app.post('/', function(req, res, next) {
  const { errors, isValid } = isValidate(req.body);
  const { identifier, password } = req.body;
  if(isValid) {
    users.find({$or: [ {'localAuth.username': identifier}, {'localAuth.email': identifier} ]}, function(err, user) {
      if(!_.isEmpty(user)) {
        bcrypt.compare(password, user[0].localAuth.password, function(err, isMatch) {
          if(!err && isMatch) {
            var token = jwt.sign({
              id: user[0]._id,
              username: user[0].localAuth.username,
              email: user[0].localAuth.email,
              avatar: user[0].avatar
            }, config.secret);
            res.json({token})
          } else {
            res.status(401).json({ errors: { form: 'Sorry, your username or password was incorrect. Please double-check your password.' } })
          }
        })
      }
      if(_.isEmpty(user)) {
        res.status(401).json({ errors: { form: 'Sorry, your username or password was incorrect. Please double-check your password.' } })
      }
    })
  } else {
    res.status(400).json(errors);
  }
});


module.exports = app;
