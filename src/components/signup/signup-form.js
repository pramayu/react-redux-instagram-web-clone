import React, { Component } from 'react';
import validator from 'validator';
import _ from 'lodash';
import classnames from 'classnames';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullname: '',
      password: '',
      email: '',
      errors: {},
      invalid: false
    }
  }

  isValidate(data) {
    let errors = {};

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

  isValid() {
    let { errors, isValid } = this.isValidate(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExist(e) {
    let field = e.target.name;
    let value = e.target.value;
    if(value !== '') {
      this.props.checkUserExist(value).then((res) => {
        let errors = this.state.errors;
        let invalid;
        if(!_.isEmpty(res.data.user)) {
          errors[field] = field + ' is already in use';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid })
      });
    }
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
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({errors: {}});
      this.props.setUserSignup(this.state)
    }
  }

  render() {
    let { errors } = this.state;
    return (
      <form className="lgn-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className={classnames('form-group _this_mrg', {'has-error': errors.username})}>
          <input value={this.state.username} onBlur={this.checkUserExist.bind(this)} onChange={this.handleChange.bind(this)}type="text"
            name="username" placeholder="Username" className="form-control" autoComplete="off"/>
          <span className="error-sign"></span>
        </div>
        <div className={classnames('form-group _this_mrg', {'has-error': errors.fullname})}>
          <input value={this.state.fullname} onChange={this.handleChange.bind(this)}type="text"
            name="fullname" placeholder="Fullname" className="form-control" autoComplete="off"/>
          <span className="error-sign"></span>
        </div>
        <div className={classnames('form-group _this_mrg', {'has-error': errors.email})}>
          <input value={this.state.email} onBlur={this.checkUserExist.bind(this)} onChange={this.handleChange.bind(this)} type="email"
            name="email" placeholder="Email" className="form-control" autoComplete="off"/>
          <span className="error-sign"></span>
        </div>
        <div className={classnames('form-group', {'has-error': errors.password})}>
          <input value={this.state.password} onChange={this.handleChange.bind(this)} type="password"
            name="password" placeholder="Password" className="form-control" autoComplete="off"/>
          <span className="error-sign"></span>
        </div>
        <div className="btn-login">
          <button disabled = {this.state.invalid} className="btn tb btn-block" type="submit">Sign up</button>
        </div>
      </form>
    )
  }
}


export default SignupForm;
