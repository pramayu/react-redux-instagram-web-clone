import React, { Component } from 'react';
import classnames from 'classnames';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import config from '../../../config/main';

class PassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
      pass_confirm: '',
      success: '',
      errors: {},
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if(!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  checkPassword() {
    var encrypt = jwt.sign({ token: this.state.old_password}, config.secret);
    this.props.checkPassword(this.props.current_user.user.id, encrypt).then(res => {
      this.setState({ success: res.data.success })
    })
  }

  isValidate(data) {
    let errors = {};
    if(validator.isEmpty(data.old_password)) {
      errors.old_password = 'This field is required';
    }
    if(validator.isEmpty(data.new_password)) {
      errors.new_password = 'This field is required';
    }
    if(validator.isEmpty(data.pass_confirm)) {
      errors.pass_confirm = 'This field is required';
    }
    if(!validator.equals(data.new_password, data.pass_confirm)) {
      errors.pass_confirm = 'New password and Confirm must match';
    }
    if(validator.equals(data.old_password, data.new_password)) {
      errors.new_password = 'Old password can not be same with new password';
    }
    if(!validator.isLength(data.new_password,{ min: 5})) {
      errors.new_password = 'Password min 5 character';
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

  handleSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ isLoading: true })
      this.props.updateUserPassword(this.state, this.props.current_user.user.id).then(res => {
        let that = this;
        setTimeout(function () {
          that.setState({
            success: res.data.success,
            old_password: '',
            new_password: '',
            pass_confirm: '',
            isLoading: false
          })
        }, 500);
      })
    }
  }



  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <li className="nm"><h4>{this.props.current_user.user.username}</h4></li>
        <li className={classnames('form-group fl', {'has-error': this.state.success === false}, {'has-error': errors.old_password})}>
          <input type="password" name="old_password" onChange={this.handleChange} value={this.state.old_password}
            className="form-control" onBlur={this.checkPassword} />
          <span className="error-sign pass"></span>
        </li>
        <li className={classnames('form-group usr', {'has-error': errors.new_password})}>
          <input type="password" name="new_password" onChange={this.handleChange} value={this.state.new_password}
            className="form-control" />
          <span className="error-sign pass"></span>
        </li>
        <li className={classnames('form-group web', {'has-error': errors.pass_confirm})}>
          <input type="password" name="pass_confirm" onChange={this.handleChange} value={this.state.pass_confirm}
            className="form-control" />
          <span className="error-sign pass"></span>
        </li>
        <li className="bgth">
          <button type="submit" className="btn btn-f">SUBMIT</button>
        </li>
        <div className={classnames('line-scale-pulse-out', {'line-scale-pulse-in': this.state.isLoading === true})}>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </form>
    )
  }
}

export default PassForm;
