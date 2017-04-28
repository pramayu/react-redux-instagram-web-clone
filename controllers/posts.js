var express = require('express');
var cloudinary = require('cloudinary');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var async = require('async');
var posts = require('../models/post');
var votes = require('../models/vote');
var comments = require('../models/comment');
var users = require('../models/user');
var relationships = require('../models/relationship');
var app = express.Router();

cloudinary.config({
  cloud_name: 'foo',
  api_key: '933274521521578',
  api_secret: 'vNJ4wz7V5pAbSlBlCnjvBvFyXvo'
});


app.post('/6a232700b90653d8a5ad04/picture/upload', (req, res, next) => {
  var images = req.body.url_images;
  var location = req.body.location;
  var caption = req.body.caption;
  var public_id = req.body.public_id;
  var token = jwt.decode(req.body.token);
  var post = new posts();
  post.location = location;
  post.caption = caption;
  post.images.picture = images;
  post.images.public_id = public_id;
  post.user_id = token.id;
  post.save((err, result) => {
    res.json({post: result})
  })
})


app.get('/images/remove/:payload/storage', (req, res, next) => {
  var public_id = req.params.payload;
  cloudinary.uploader.destroy(public_id, (result) => {
    console.log(result)
  })
})

app.get('/6d1021deb2eff884b76f27f56/:payload/user', (req, res, next) => {
  var username = req.params.payload;
  users.findOne({'localAuth.username': username}, '_id', (err, user) => {
    if(!_.isEmpty(user)) {
      posts.find({user_id: user._id}).sort({created_at: 'asc'}).exec(function(err, post){
        if(!_.isEmpty(post)) {
          res.json({post})
        }
      })
    } else {
      res.json({ success: false })
    }
  })
})

app.get('/14cfa0263281ef36f0fe/:post_id/5b6f9e4fd2f6f926e192/:user_id/80ab075690a54419a183', (req, res, next) => {
  var post_id = req.params.post_id;
  var current_user = req.params.user_id;
  posts.findOne({_id: post_id})
  .populate('user_id', '_id')
  .exec((err, post) => {
    if(current_user === post.user_id[0]._id.toString()) {
      res.json({post})
    } else {
      res.json({success: false})
    }
  })
})

app.get('/69dee2745fde0dcdb6c5/:post_id/16803424a998f29c13bc/:target_id/f4ff6e230e71a06e8cf1', (req, res, next) => {
  var post_id = req.params.post_id;
  var target_id = req.params.target_id;
  async.waterfall([
    function findPost(done) {
      posts.findOne({ _id: post_id }, (err, post) => {
        done(null, post)
      })
    },
    function removeArray(post, done) {
      var post_ = post.images.picture[target_id];
      var public_ = post.images.public_id[target_id];
      posts.update({ _id: post_id }, { $pull : { 'images.picture': post_, 'images.public_id': public_ } }, { safe: true }, (err, postx) => {
        done(null, postx)
      })
    },
    function reSendPost(postx, done) {
      posts.findOne({ _id: post_id }, (err, post) => {
        done(null, post)
      })
    }
  ], (err, post) => {
    res.json({ post })
  })
})

app.post('/fa24372a8bbda02037ac/:post_id/286c47e43750761b7738', (req, res, next) => {
  var post_id = req.params.post_id;
  var caption = req.body.caption;
  var location = req.body.location;
  var images = req.body.images;
  var public_id = req.body.public_id;
  console.log( post_id,  req.body.caption,  req.body.location,  req.body.images,  req.body.public_id)
  console.log(req.body)
  async.waterfall([
    function updatePost(done) {
      posts.update({ _id: post_id }, { $set: { caption: caption, location: location, 'images.picture': images, 'images.public_id': public_id }}, (err, post) => {
        if(!err) {
          done(null, post)
        }
      })
    },
    function reSendPost(post, done) {
      posts.findOne({_id: post_id}, (err, post) => {
        done(null, post)
      })
    }
  ], (err, post) => {
    res.json({post})
  })
})


app.get('/ed73bb1ef9c087428004/:user_id/ca037e9507e5d1537a3c/:post_id/016a89cd3337738120b81253193bae2b523f6b56', (req, res, next) => {
  var user_id = req.params.user_id;
  var post_id = req.params.post_id;
  async.waterfall([
    function findPost(done) {
      posts.findOne({ _id: post_id }, '_id user_id', (err, post) => {
        done(null, post)
      })
    },
    function removeVotes(post, done) {
      votes.remove({post_id: post_id}, (err, vote) => {
        done(null, post)
      })
    },
    function removeComments(post, done) {
      comments.remove({post_id: post_id}, (err, comment) => {
        done(null, post)
      })
    },
    function removePost(post, done) {
      if(post.user_id.toString() === user_id) {
        posts.findByIdAndRemove(post_id, (err, post) => {
          done(null, post)
        })
      }
    }
  ], (err, post) => {
    res.json({ id: post._id })
  })
})


app.get('/c9c6093e0597aae6697c/:user_id/fe8b22bf1a8ac6a176a73cc0cfbbbb50bc3eef492805d2b7fb98801123c9162d', (req, res, next) => {
  var current_user = req.params.user_id;
  async.waterfall([
    function findRelations(done) {
      relationships.findOne({ user_id: current_user}, (err, relationship) => {
        if(!_.isEmpty(relationship)) {
          done(null, relationship)
        }
      })
    },
    function findPostsByRelation(relationship, done) {
      if(!_.isEmpty(relationship.following_id)) {
        posts.find({ $or: [{ user_id: { $in: relationship.following_id}}, { user_id: { $in: [current_user] }} ]})
        .populate('user_id', '_id avatar localAuth.username')
        .sort({created_at: 'desc'})
        .exec((err, posts) => {
          done(null, posts)
        })
      } else {
        posts.find({ user_id: { $in: [current_user] }})
        .populate('user_id', '_id avatar localAuth.username')
        .sort({created_at: 'desc'})
        .exec((err, posts) => {
          done(null, posts)
        })
      }
    }
  ], (err, posts) => {
    res.json({ posts })
  })
})

app.get('/2b83f125092e0c6cb5eec0e51cee55c6963a9b51/2f7ea852b6367e10bd679e0ad7246cc49f0d582e', (req, res, next) => {
  votes.find({})
  .populate('user_id', '_id localAuth.username')
  .exec((err, votes) => {
    res.json({ votes })
  })
})


module.exports = app;
