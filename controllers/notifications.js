var express = require('express');
var app = express.Router();
var async = require('async');
var notifications = require('../models/notification');

// like
app.get('/f88f77d4a858488737a/:post_id/767f4bea883ecabbc5ab/:user_id/68b6ce328961fa538af5/:notice/5a65d5e7bf/:current_user', (req, res, next) => {
  var post_id = req.params.post_id;
  var user_id = req.params.user_id;
  var notice = req.params.notice;
  var current_user = req.params.current_user;
  async.waterfall([
    function setNotif(done) {
      var notification = new notifications();
      notification.post_id = post_id;
      notification.user_id = user_id;
      notification.notice_type = notice;
      notification.notified_by = current_user;
      notification.save((err, notification) => {
        done(null, notification)
      })
    },
    function getNotif(notification, done) {
      notifications.findOne({_id: notification._id})
      .populate('user_id', '_id avatar localAuth.username')
      .populate('post_id', '_id caption')
      .populate('notified_by', '_id avatar localAuth.username')
      .exec((err, notification) => {
        done(null, notification)
      })
    }
  ], (err, notification) => {
    if(current_user !== user_id) {
      res.json({notification})
    }
  })
});

// commnt notif

app.get('/6a7ea20fbf/:post_id/0683c919e5/:user_id/3d153d6a0b/:notice/5a65d5e7bf/:current_user/ea1a17ca37/:comment_id', (req, res, next) => {
  var post_id = req.params.post_id;
  var user_id = req.params.user_id;
  console.log(user_id)
  var notice = req.params.notice;
  var current_user = req.params.current_user;
  var comment_id = req.params.comment_id;
  async.waterfall([
    function setNotif(done) {
      var notification = new notifications();
      notification.post_id = post_id;
      notification.user_id = user_id;
      notification.notice_type = notice;
      notification.notified_by = current_user;
      notification.comment_id = comment_id;
      notification.save((err, notification) => {
        done(null, notification)
      })
    },
    function getNotif(notification, done) {
      notifications.findOne({_id: notification._id})
      .populate('user_id', '_id avatar localAuth.username')
      .populate('post_id', '_id caption')
      .populate('comment_id', '_id comment')
      .populate('notified_by', '_id avatar localAuth.username')
      .exec((err, notification) => {
        done(null, notification)
      })
    }
  ], (err, notification) => {
    if(current_user !== user_id) {
      res.json({notification})
    }
  })
})

// follow
app.get('/4e942e5f7d/:user_id/415902fdaf2b7e3767e5/:current_user/b6fb55252c/:notice/adc2966d80', (req, res, next) => {
  var user_id = req.params.user_id;
  var current_user = req.params.current_user;
  var notice = req.params.notice;
  async.waterfall([
    function setNotif(done) {
      var notification = new notifications();
      notification.user_id = user_id;
      notification.notice_type = notice;
      notification.notified_by = current_user;
      notification.save((err, notification) => {
        done(null, notification)
      })
    },
    function getNotif(notification, done) {
      notifications.findOne({_id: notification._id})
      .populate('user_id', '_id avatar localAuth.username')
      .populate('notified_by', '_id avatar localAuth.username')
      .exec((err, notification) => {
        done(null, notification)
      })
    }
  ], (err, notification) => {
    res.json({ notification })
  })
})

// all
app.get('/f858557f36b3d62ee70c/:user_id/2b4392ee6da4f0b8630d9a7d3cedcd6386b113e0b09605e031b76a2299e4', (req, res, next) => {
  var user_id = req.params.user_id;
  notifications.find({user_id: user_id})
  .populate('user_id', '_id avatar localAuth.username')
  .populate('post_id', '_id caption')
  .populate('comment_id', '_id comment')
  .populate('notified_by', '_id avatar localAuth.username')
  .exec((err, notifications) => {
    res.json({notifications})
  })
})


module.exports = app;
