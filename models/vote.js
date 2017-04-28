import mongoose from 'mongoose';

var VoteSchema = new mongoose.Schema({
  user_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true
  }],
  post_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'posts', require: true
  }]
})

module.exports = mongoose.model('votes', VoteSchema);
