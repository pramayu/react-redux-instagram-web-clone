import React, { Component } from 'react';
import validator from 'validator';
import _ from 'lodash';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setNewPassword } from '../../actions/users';

class RenewForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      new_password: '',
      confirm_password: '',
      errors: {},
      success: false,
      invalid: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  isValidate(data) {
    let errors = {};
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

  isValid() {
    let { errors, isValid } = this.isValidate(this.state);
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  handleChange(e) {
    if(!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value, errors })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let params = this.props.params.token;
    if(this.isValid()) {
      this.props.setNewPassword(params, this.state).then(res => {
        this.setState({ errors: res.data.errors, success: res.data.success, invalid: res.data.errors.form})
        if(this.state.success === true) {
          browserHistory.push('/signin')
        }
      })
    }
  }

  render() {
    let {errors, invalid} = this.state;
    return (
      <div>
        <form className="lgn-form" onSubmit={this.handleSubmit}>
          <div className={classnames('form-group _this_mrg', {'has-error': errors.new_password})}>
            <input value={this.state.new_password} type="password" name="new_password" onChange={this.handleChange}
              placeholder="New Password" className="form-control" autoComplete="off" />
            <span className="error-sign"></span>
          </div>
          <div className={classnames('form-group _this_mrg', {'has-error': errors.confirm_password})}>
            <input value={this.state.confirm_password} type="password" name="confirm_password" onChange={this.handleChange}
              placeholder="Confirm Password" className="form-control" autoComplete="off" />
            <span className="error-sign"></span>
          </div>
          <div className="btn-login">
            <button type="submit" className="btn tb btn-block">Reset Password</button>
          </div>
        </form>
        <div className="omni-auth nore">
          <div className="err">
            {invalid && <div className="alert alert-danger">{invalid}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setNewPassword })(RenewForm);
