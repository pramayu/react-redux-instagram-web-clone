var mongoose = require('mongoose');

var RelationshipSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true
  },
  follower_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }],
  following_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }]
})

module.exports = mongoose.model('relationships', RelationshipSchema)
