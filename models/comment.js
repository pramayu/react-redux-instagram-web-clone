var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: {
    type: String, require: true
  },
  post_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'posts', require: true
  }],
  user_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true
  }],
  created_at: {
    type: Date, default: Date.now
  },
})

module.exports = mongoose.model('comments', CommentSchema)
