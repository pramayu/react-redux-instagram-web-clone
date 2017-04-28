var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
  notice_type: {
    type: String, require: true
  },
  read: {
    type: Boolean, default: false, require: true
  },
  post_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'posts'
  }],
  user_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }],
  notified_by: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }],
  comment_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'comments'
  }],
  created_at: {
    type: Date, default: Date.now
  }
})

module.exports = mongoose.model('notifications', NotificationSchema)
