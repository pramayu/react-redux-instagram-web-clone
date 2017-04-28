var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema ({
  localAuth: {
    email: {
      type: String, lowercase: true, unique: true
    },
    username: {
      type: String, lowercase: true, unique: true
    },
    fullname: {
      type: String
    },
    password: {
      type: String, minlength: 5
    },
    activation_token: {
      type: String
    },
    password_token: {
      type: String
    },
    password_reset: {
      type: Boolean, default: false
    }
  },
  activated: {
    type: Boolean, default: false
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  phone: {
    type: String
  },
  gender: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('users', UserSchema);
