var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  images: {
    public_id: [{
      type: String, require: true
    }],
    picture: [{
      type: String, require: true
    }]
  },
  location: {
    type: String
  },
  caption: {
    type: String
  },
  created_at: {
    type: Date, default: Date.now
  },
  user_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }]
})

module.exports = mongoose.model('posts', PostSchema)
