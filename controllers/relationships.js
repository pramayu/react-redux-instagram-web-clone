var express = require('express');
var _ = require('lodash');
var async = require('async');
var app = express.Router();

var users = require('../models/user');
var relationships = require('../models/relationship');

app.post('/a81eb2ad2a1a1283f802/:current_user/following/:user_id/40a1c85568ae04617a97', (req, res, next) => {
  var current_user = req.params.current_user;
  var user_id = req.params.user_id;
  async.waterfall([
    function findUser(done) {
      relationships.find({'user_id': user_id}, (err, relationship) => {
        let rel = Object.assign({}, relationship);
        done(null, rel)
      })
    },
    function updateUserFollower(rel, done) {
      if(!_.isEmpty(rel)) {
        relationships.update({user_id: user_id}, {$push: {follower_id: current_user}}, (err, relationship_x) => {
          done(null, relationship_x)
        })
      } else {
        var relationship = new relationships();
        relationship.follower_id = current_user;
        relationship.user_id = user_id;
        relationship.save((err, relationship_x) => {
          if(!err) {
            done(null, relationship_x)
          }
        })
      }
    },
    function sendFollowUser(relationship_x, done) {
      relationships.find({'user_id': user_id}, (err, relationship) => {
        done(null, relationship)
      })
    }
  ], (err, relationship) => {
    res.json({ relationship })
  })
})


app.post('/a895dbc9751a9c322db2/:current_user/btp/:user_id/ffe498101aee44af7603', (req, res, next) => {
  var current_user = req.params.current_user;
  var user_id = req.params.user_id;
  async.waterfall([
    function getCurrentUser(done) {
      relationships.find({'user_id': current_user}, (err, relationship) => {
        let rel = Object.assign({}, relationship);
        done(null, rel)
      })
    },
    function setFollowingUser(rel, done) {
      if(!_.isEmpty(rel)) {
        relationships.update({user_id: current_user}, {$push: {following_id: user_id}}, (err, relationship_x) => {
          done(null, relationship_x)
        })
      } else {
        var relationship = new relationships();
        relationship.following_id = user_id;
        relationship.user_id = current_user;
        relationship.save((err, relationship_x) => {
          if(!err) {
            done(null, relationship_x)
          }
        })
      }
    }
  ], (err, result) => {
    res.json({status: true})
  })
})

app.get('/d1aa8c40be9bc551ae27/:current_user/unfollow/:user_id/7038923f4a237d5930eb', (req, res, next) => {
  var current_user = req.params.current_user;
  var user_id = req.params.user_id;
  async.waterfall([
    function checkUserFollow(done) {
      relationships.findOne({user_id: user_id}, (err, relationship) => {
        let rel = Object.assign({}, relationship);
        done(null, rel)
      })
    },
    function deleteUserFollow(rel, done) {
      if(!_.isEmpty(rel)) {
        relationships.update({user_id: user_id}, { $pull: {follower_id: req.params.current_user}}, { safe: true }, (err, relationship_x) => {
          done(null, relationship_x)
        })
      }
    },
    function sendFollowUser(relationship_x, done) {
      relationships.find({'user_id': user_id}, (err, relationship) => {
        done(null, relationship)
      })
    }
  ], (err, relationship) => {
    res.json({relationship})
  })
})

app.get('/c473b147ccb4efc43b32/:current_user/basukitjahyapurnama/:user_id/75636a7177a8198ed28d', (req, res, next) => {
  var current_user = req.params.current_user;
  var user_id = req.params.user_id;
  async.waterfall([
    function getCurrentUser(done) {
      relationships.find({'user_id': current_user}, (err, relationship) => {
        let rel = Object.assign({}, relationship);
        done(null, rel)
      })
    },
    function deleteUserFollow(rel, done) {
      if(!_.isEmpty(rel)) {
        relationships.update({user_id: current_user}, { $pull: {following_id: req.params.user_id}}, { safe: true }, (err, relationship_x) => {
          done(null, relationship_x)
        })
      }
    }
  ], (err, result) => {
    res.json({success: true})
  })
})

app.get('/897cc6ae25d5620eec50/:user_id/cdcf39487254cda24e89', (req, res, next) => {
  var username = req.params.user_id;
  users.findOne({'localAuth.username': username}, '_id username', (err, user) => {
    relationships.findOne({'user_id': user._id}, (err, relationship) => {
      res.json({relationship})
    })
  })
})


module.exports = app;
