import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from './signup-form';
import { setUserSignup, checkUserExist } from '../../actions/signup';

class SignupPage extends Component {
  toLogin() {
    window.location.href = '/signin';
  }
  render() {
    let { setUserSignup, checkUserExist } = this.props;
    return (
      <div className="bg-auth">
        <div className="container bg-auth">
          <div className="row">
            <div className="col-md-10 col-md-offset-2">
              <div className="col-md-6 left-side">
                <div className="slider_img">
                  <ul className="this_list">
                    <li><img src="/images/sliders/aafd8c6b005d.jpg" alt="" /></li>
                    <li><img src="/images/sliders/2d9d7248af43.jpg" alt="" /></li>
                    <li><img src="/images/sliders/629d23a3c7b2.jpg" alt="" /></li>
                    <li><img src="/images/sliders/001bc33056c1.jpg" alt="" /></li>
                    <li><img src="/images/sliders/f5ae123ab1e2.jpg" alt="" /></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5 right-side">
                  <div id="form-signup">
                    <div className="login-frm">
                      {/*<div className="title-inst"></div> */}
                      <div className="title-inst2"><span className="nj">_Khilogram.</span></div>
                      <div className="omni-auth o-auth">
                       <div className="bti btw">
                        <a href="/auth/facebook" className="btn-omni btn btn-block">Log in with Facebook</a>
                      </div>
                        <p className="or">OR</p>
                      </div>
                      <SignupForm
                        setUserSignup={setUserSignup}
                        checkUserExist={checkUserExist}
                      />
                      <div className="term">
                        <p className="fo">By signing up, you agree to our <strong>Terms &amp; Privacy Policy</strong></p>
                      </div>
                    </div>
                    <div className="sign_up_switch">
                      <p className="donthave">Have an account? <span><a onClick={this.toLogin.bind(this)}>Log in</a></span></p>
                    </div>
                  </div>
                </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setUserSignup, checkUserExist })(SignupPage);
