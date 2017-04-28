import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ProfileForm from './profile-form';
import { getUserInfo, setUserEdit } from '../../actions/users';
import { getUpdateToken } from '../../actions/signin';

class ProfilePage extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.current_user.user.username)
  }

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
            <li className='fis'><p className="g name">Name</p></li>
            <li><p className="g username">Username</p></li>
            <li><p className="g website">Website</p></li>
            <li><p className="g name">Bio</p></li>
            <li><p className="g fg">Email</p></li>
            <li><p className="g">Phone Number</p></li>
            <li><p className="g">Gender</p></li>
          </ul>
        </div>
        <div className="col-md-9 right_s">
          <ul className="right-form list-unstyled">
            <ProfileForm current_user = { this.props.current_user } user_info = { this.props.user_info.user }
              setUserEdit = { this.props.setUserEdit } getUpdateToken = { this.props.getUpdateToken }
            />
          </ul>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  current_user: React.PropTypes.object.isRequired,
  getUserInfo: React.PropTypes.func.isRequired,
  setUserEdit: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_info: state.user_info
  }
}

export default connect(mapStateToProps, { getUserInfo, setUserEdit, getUpdateToken })(ProfilePage);
