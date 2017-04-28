var express = require('express');
var _ = require('lodash');
var users = require('../models/user');

var app = express.Router();

app.get('/86824ed62f70a8544b80fdfb15fe/:username/niputu', (req, res, next) => {
  var usrname = req.params.username;
  users.findOne({'localAuth.username': usrname}, 'localAuth.username localAuth.fullname bio website avatar phone', (err, user) => {
    if(!_.isEmpty(user)) {
      res.json({user})
    } else {
      res.json({ status: false})
    }
  })
})





module.exports = app;
