var validator = require('validator');
var _ = require('lodash');

module.exports = function(data) {
  var errors = {};
  if(!validator.isEmail(data.email)) {
    errors.email = 'This field is required';
  }
  if(validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if(validator.isEmpty(data.fullname)) {
    errors.fullname = 'This field is required';
  }
  if(validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
