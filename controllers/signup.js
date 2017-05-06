var express = require('express');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var _ = require('lodash');
var randomstring = require("randomstring");

var users = require('../models/user');
var validate = require('../validate/signup-validate');
var config = require('../config/main');

var app = express.Router();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dmonmad@gmail.com',
    pass: config.email.password
  }
});


app.get('/check/:identifier', function(req, res, next) {
  var identifier = req.params.identifier;
  users.find({$or:[ {'localAuth.username': identifier}, {'localAuth.email': identifier} ]}, 'username email', function(err, user) {
    res.json({user})
  })
})


app.post('/f912ac38ddd196f4f6a1db0634394ff10915f0d38d3f3d5e72ec42ea6cc31828/signup', function(req, res, next) {
  const { errors, isValid } = validate(req.body);
  var token=randomstring.generate();
  var host=req.get('host');
  var link="http://"+req.get('host')+"/verify/"+token;
  if(isValid) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        var user = new users({
          'localAuth.username': req.body.username,
          'localAuth.email': req.body.email,
          'localAuth.password': hash,
          'localAuth.fullname': req.body.fullname,
          'localAuth.activation_token': token
        })
        user.save(function(err, user) {
          if(err) {
            return res.send();
          }
          res.status(200).json({success: true, user})
          var emailOpts = {
            from: '"Khilogram" <clientservices@khilogram.com>',
            to: user.localAuth.email,
            subject: 'Activate Your Khilogram Account',
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify♡♡♡</a>"
          }
          transporter.sendMail(emailOpts, (err) => {
            if(err) {
              console.log(err)
            }
            if(!err) {
              console.log('send')
            }
          })
        })
      })
    })
  }
});



module.exports = app;
