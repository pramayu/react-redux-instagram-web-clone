import React, { Component } from 'react';
import { connect } from 'react-redux';
import PassForm from './password-form';
import { checkPassword, updateUserPassword } from '../../actions/users';

class PassPage extends Component {
  render() {
    const existPic = (
      <li><span className="getr" style={{backgroundImage: 'url(' + this.props.current_user.user.avatar + ')'}}></span></li>
    );

    const defPic = (
      <li><span className="getr" style={{backgroundImage: 'url(/images/default/profile.png)'}}></span></li>  
    );
    return (
      <div className="col-md-9 right_">
        <div className="col-md-3 left_s">
          <ul className="left_info list-unstyled">
            <div className="ajng">
              { this.props.current_user.user.avatar ? existPic : defPic }
            </div>
            <li className="fis">
              <p className="g name">Old Password</p>
            </li>
            <li>
              <p className="g username">New Password</p>
            </li>
            <li>
              <p className="g website">Confirmation</p>
            </li>
          </ul>
        </div>
        <div className="col-md-9 right_s">
          <ul className="right-form list-unstyled">
            <PassForm checkPassword={ this.props.checkPassword } current_user={this.props.current_user}
            updateUserPassword = {this.props.updateUserPassword}/>
          </ul>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

PassPage.propTypes = {
  current_user: React.PropTypes.object.isRequired,
  checkPassword: React.PropTypes.func.isRequired,
  updateUserPassword: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, { checkPassword, updateUserPassword })(PassPage);
