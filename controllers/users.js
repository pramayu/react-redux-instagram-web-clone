var express = require('express');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var aes = require('crypto-js');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var config = require('../config/main');
var users = require('../models/user');
var validate = require('../validate/change-password');
var isValidate = require('../validate/password-reset');
var app = express.Router();


app.get('/profile/:user/edit', function(req, res, next) {
  var username = req.params.user;
  users.findOne({'localAuth.username': username}, '_id localAuth.username localAuth.email localAuth.fullname website bio phone gender avatar',
  function(err, user){
    if(!_.isEmpty(user)) {
      res.json({user})
    }
  })
})

app.put('/profile/:user/edit', function(req, res, next) {
  var username = req.params.user;
  users.findOne({'localAuth.username': username}, '_id localAuth.username localAuth.email localAuth.fullname website bio phone gender avatar',
  function(err, user){
    if(!_.isEmpty(user)) {
      user.localAuth.username = req.body.username || user.localAuth.username;
      user.localAuth.fullname = req.body.fullname || user.localAuth.fullname;
      user.localAuth.email = req.body.email || user.localAuth.email;
      user.website = req.body.website || user.website;
      user.bio = req.body.bio || user.bio;
      user.phone = req.body.phone || user.phone;
      user.gender = req.body.gender || user.gender;
      user.avatar = req.body.avatar || user.avatar;
      user.save(function(err, result) {
        if(!err) {
          res.json({ user: result, success: 'Your data successfully updated' });
        }
      })
    }
  })
})

app.post('/refresh/:user_id/token', function(req, res, next) {
  var id = req.params.user_id;
  users.findById(id, function(err, user) {
    if(!_.isEmpty(user)) {
      var token = jwt.sign({
        id: user._id,
        username: user.localAuth.username,
        email: user.localAuth.email,
        avatar: user.avatar
      }, config.secret);
      res.json({token})
    }
  })
})

app.get('/password/:user_id/check', (req, res, next) => {
  var id = req.params.user_id;
  var encrypt = req.query.token;
  var password = jwt.decode(encrypt);
  users.findById(id, '_id username localAuth.password', (err, user) => {
    if(!_.isEmpty(user)) {
      bcrypt.compare(password.token, user.localAuth.password, (err, isMatch) => {
        if(!err && isMatch) {
          res.json({ success: true })
        } else {
          res.json({ success: false, errors: { form: 'Password not found. Please check your password'} })
        }
      })
    } else {
      res.json({ success: false, errors: { form: 'Password not found. Please check your password'} })
    }
  })
})

app.put('/d8036b0645e8/:user_id/update', (req, res, next) => {
  var id = req.params.user_id;
  var password = req.body.new_password;
  const { errors, isValid } = validate(req.body);
  if(!isValid) {
    res.status(400).json(errors);
  } else if (isValid) {
    users.findById(id, 'localAuth.password', (err, user) => {
      if(!_.isEmpty(user)) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            user.localAuth.password = hash;
            user.save(err => {
              if(!err) {
                res.json({success: true})
              }
            })
          })
        })
      }
    })
  }
})

// email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dmonmad@gmail.com',
    pass: config.email.password
  }
});

app.get('/584c8be38c4d0/:identifier/reset', function (req, res, next) {
  var username = req.params.identifier;
  var token = randomstring.generate();
  var link="http://"+req.get('host')+"/accounts/password/31f70419689b279f66596c6b48/"+token;

  users.findOne({'localAuth.username': username}, '_id localAuth.email localAuth.username', function(err, user) {
    if(user.localAuth.username === username) {
      user.localAuth.password_token = token;
      user.localAuth.password_reset = true;
      var emailOpts = {
        from: '"Khilogram" <clientservices@khilogram.com>',
        to: user.localAuth.email,
        subject: 'Reset Password',
        html: "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to reset</a>"
      };
      user.save(function(err, result) {
        if(!err) {
          transporter.sendMail(emailOpts, function(err) {
            if(!err) {
              res.json({success: 'Please check your email address'})
            }
          })
        }
      })
    }
    else {
      res.json({errors: 'Account not found, Please register new account'})
    }
  })
})

app.post('/9e670ac51f92c3d9ec6ea/:token/410126ac871da60', (req, res, next) => {
  var token = req.params.token;
  var new_password = req.body.new_password;
  const { errors, isValid } = isValidate(req.body);
  console.log('new_password '+ new_password)
  if(!isValid) {
    res.json({errors})
  } else if (isValid) {
    users.findOne({'localAuth.password_token': token}, '_id localAuth.password_reset', (err, user) => {
    if(user.localAuth.password_reset === true) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(new_password, salt, (err, hash) => {
          user.localAuth.password_reset = false;
          user.localAuth.password = hash;
          user.save(function(err, result) {
        if(!err) {
          res.json({errors: { form: ''}, success: true})
        }
      })
        })
      })
    } else if(user.localAuth.password_reset === false) {
      res.json({errors: { form: 'Token Already Expired'}, success: false})
    }
  })
  }
})


module.exports = app;
