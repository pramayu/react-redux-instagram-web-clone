import React, { Component } from 'react';
import aes from 'crypto-js';
import classnames from 'classnames';
import { connect } from 'react-redux';
import config from '../../../config/main';
import { setResetPassword } from '../../actions/users';


class ResetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      errors: {},
      success: '',
      show: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkExistAccount = this.checkExistAccount.bind(this)
  }

  isValidate(data) {
    if(validator.isEmpty(data.identifier)) {
      errors.identifier = 'This field is required';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValid() {
    let { errors, isValid } = this.isValidate(this.state);

    if(!isValid) {
      this.setState({errors})
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
    this.setState({show: true})
  }


  checkExistAccount() {
    this.props.setResetPassword(this.state.identifier).then(res => {
      this.setState({ success: res.data.success })
    })
  }

  render() {
    return (
    <div>
      <form className="lgn-form" onSubmit={this.handleSubmit}>
        <div className="form-group _this_mrg">
          <input value={this.state.identifier} type="text" name="identifier" onChange={this.handleChange}
            placeholder="Username" className="form-control" autoComplete="off" onBlur={this.checkExistAccount}/>
          <span className="error-sign"></span>
        </div>
        <div className="btn-login">
          <button type="submit" className="btn tb btn-block">Reset Password</button>
        </div>
      </form>
      <div className="omni-auth nore">
        <div className="err">
          {this.state.success && <div className={classnames('alert alert-danger isnotLoading', {'isLoading': this.state.show === true})}>
            {this.state.success}
          </div>}
        </div>
      </div>
    </div>
    )
  }
}

export default connect(null, { setResetPassword })(ResetForm);
