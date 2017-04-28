var validator = require('validator');
var _ = require('lodash');

module.exports = function(data) {
  var errors = {};
  if(validator.isEmpty(data.new_password)) {
    errors.new_password = 'This field is required';
  }
  if(validator.isEmpty(data.pass_confirm)) {
    errors.pass_confirm = 'This field is required';
  }
  if(!validator.equals(data.new_password, data.pass_confirm)) {
    errors.match = 'New password and confirm password must match'
  }
  if(validator.equals(data.old_password, data.new_password)) {
    errors.new_password = 'Old password can not be same with new password';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
