var validator = require('validator');
var _ = require('lodash');


module.exports = function(data) {
  var errors = {};
  if(validator.isEmpty(data.new_password)) {
    errors.new_password = 'This field is required';
  }
  if(validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'This field is required';
  }
  if(!validator.equals(data.new_password, data.confirm_password)) {
    errors.confirm_password = 'Password not match';
  }
  if(!validator.isLength(data.new_password, {min:5})) {
    errors.new_password = 'Minimum password length 5 digits';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
