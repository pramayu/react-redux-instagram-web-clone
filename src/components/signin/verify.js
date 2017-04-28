import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVerifyUser } from '../../actions/signin';

class Verify extends Component {
  componentWillMount() {
    this.props.getVerifyUser(this.props.params.token);
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default connect(null, { getVerifyUser })(Verify);
