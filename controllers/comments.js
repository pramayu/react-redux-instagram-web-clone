var express = require('express');
var async = require('async');
var comments = require('../models/comment');
var posts = require('../models/post');
var votes = require('../models/vote');
var app = express.Router();

app.post('/add/d90585a8ce9412', (req, res, next) => {
  var _comment = req.body.comment;
  var user_id = req.body.user_id;
  var post_id = req.body.post_id;
  var comment = new comments();
  comment.comment = _comment;
  comment.user_id = user_id;
  comment.post_id = post_id;
  comment.save((err, commentz) => {
    if(err) {
      res.json({ errors: 'Comment unsuccessfully'})
    }
    comments.findOne({_id: commentz._id})
    .populate('user_id', '_id avatar localAuth.username')
    .exec(function(err, commentx) {
      res.json({comment: commentx})
    })
  })
})

app.get('/721f9c73b3b5dc/comment/dj73df9jfhd', (req, res, next) => {
  comments.find({})
  .populate('user_id', '_id avatar localAuth.username')
  .sort({created_at: 'desc'})
  .exec(function(err, comment) {
    res.json({comment})
  })
});

app.post('/dfe1233610fa6dea/:comment_id/update', (req, res, next) => {
  var id = req.params.comment_id;
  var post_id = req.body.post_id;
  var comment = req.body.comment;
  var user_id = req.body.user_id;
  comments.findOne({_id: id}, (err, comment) => {
    if(comment.post_id.toString() === post_id && comment.user_id.toString() === user_id) {
      comments.findByIdAndUpdate(id, { $set: {comment: req.body.comment}}, (err, result) => {
        if(!err) {
          comments.findOne({_id: result._id})
          .populate('user_id', '_id avatar localAuth.username')
          .exec(function(err, commentx) {
            res.json({comment: commentx})
          })
        }
      })
    }
  })
})

app.get('/17df3368c4db0f5972f03b34193b4f4771/:user_id/delete/:comment_id', (req, res, next) => {
  var id = req.params.comment_id;
  var user_id = req.params.user_id;
  comments.findOne({_id: id}, (err, comment) => {
    if(comment.user_id.toString() === user_id) {
      comments.findByIdAndRemove(comment._id, function(err, commentd) {
        res.json({ id: commentd._id})
      })
    }
  })
})


// votes

app.post('/cb5c8314c54774/:user_id/vote/:post_id', function(req, res, next) {
  var user_id = req.params.user_id;
  var post_id = req.params.post_id;
  async.waterfall([
    function addNewVote(done) {
      var vote = new votes();
      vote.user_id = user_id;
      vote.post_id = post_id;
      vote.save(function(err, vote) {
        done(null, vote)
      })
    },
    function getVote(vote, done) {
      votes.findOne({_id: vote._id})
      .populate('user_id', '_id localAuth.username')
      .exec((err, vote) => {
        done(null, vote)
      })
    }
  ], (err, vote) => {
    res.json({ votex: vote, vote: false })
  })
});

app.get('/8e0960613c61fd2cba661c4f/votes', function(req, res, next) {
  votes.find({})
  .exec(function(err, votes) {
    res.json({votes})
  })
});

app.get('/943bc55bf13f599f543ebb13/:post_id/b028d44b751c25d998b71e65/:user_id', function(req, res, next) {
  var post_id = req.params.post_id;
  var user_id = req.params.user_id;
  votes.find({post_id}, function(err, vote) {
    vote.map(function(vt) {
      if(vt.user_id.toString() === user_id) {
        votes.findByIdAndRemove(vt._id, function(err, vote) {
          res.json({ id: vote._id, vote: true })
        })
      }
    })
  })
})


module.exports = app;
