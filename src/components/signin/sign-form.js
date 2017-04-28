import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import validator from 'validator';
import classnames from 'classnames';

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      invalid: '',
      errors: {}
    }
  }

  isValidate(data) {
    let errors = {};
    if(validator.isEmpty(data.identifier)) {
      errors.identifier = 'This field is required';
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

  handleSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {}})
      this.props.getUserSignin(this.state).then(
        () => {},
        ({ response }) => this.setState({
          errors: response.data,
          invalid: response.data.errors.form
        })
      )
    }
  }

  render() {
    let { identifier, password, errors, invalid } = this.state;
    return (
      <div>
        <form className="lgn-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className={classnames('form-group _this_mrg', {'has-error': errors.identifier})}>
            <input value={identifier} type="text" name="identifier" onChange={this.handleChange.bind(this)}
              placeholder="Username or Email" className="form-control" autoComplete="off"/>
            <span className="error-sign"></span>
          </div>
          <div className={classnames('form-group', {'has-error': errors.password})}>
            <input type="password" value={password} name="password" onChange={this.handleChange.bind(this)}
              placeholder="Password" className="form-control"/>
            <span className="error-sign"></span>
            <Link to='/accounts/password/reset' className='forgot'>Forgot?</Link>
          </div>
          <div className="btn-login">
            <button type="submit" className="btn tb btn-block">Sign In</button>
          </div>
        </form>
        <div className="omni-auth">
          <p className="or">OR</p>
          <div className="bti">
            <a href="#" className="btn-omni btn-block btn">Log in with Facebook</a>
          </div>
          <div className="err">
            {invalid && <div className="alert alert-danger">{invalid}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default SignForm;
