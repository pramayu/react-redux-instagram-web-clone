var express = require('express');
var app = express.Router();
var _ = require('lodash');
var users = require('../models/user');

app.get('/8cfd4af5208036e1020b7b5691744507a86bfb38/search/:term', (req, res, next) => {
  var term = req.params.term;
  var regex = new RegExp(term, 'i');
  users.find({ 'localAuth.username': regex })
  .select('_id localAuth.username avatar localAuth.fullname')
  .exec((err, users) => {
    if(_.isEmpty(users)) {
      res.json({ status: 'Users not found' })
    } else if (err) {
      res.json({ status: 'Users not found' })
    } else {
      res.json({ users })
    }
  })
})


module.exports = app;
