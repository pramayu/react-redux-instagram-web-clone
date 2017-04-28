import React, { Component } from 'react';

class SignupSuccess extends Component {
  render() {
    const inlineStyle = {
      container: {
        paddingTop: '50px'
      },
      collumn: {
        textAlign: 'center'
      }
    }
    return (
      <div className='container' style={inlineStyle.container}>
        <h2 className="text-center">Check Your Email!</h2>
        <div className="col-md-4 col-md-offset-4" style={inlineStyle.collumn}>
          <p className="foj">We’ve sent a message to your email. Open it up and click Activate Account. We’ll take it from there.</p>
        </div>
      </div>
    )
  }
}

export default SignupSuccess;
