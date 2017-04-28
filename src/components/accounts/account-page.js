import React, { Component } from 'react';
import { Link } from 'react-router';

import Navbar from '../../shared/navbar';

class AccountPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="learning-quicker">
          <div className="container munkf">
            <div className="edit-data">
              <div className="col-md-3 left_">
                <ul className="list_itm">
                  <li><Link to='/accounts/edit' activeClassName='acti'>Edit Profile</Link></li>
                  <li><Link to='/accounts/password/change' activeClassName='acti'>Change Password</Link></li>
                  <li><a href="#">Authorized Applications</a></li>
                  <li><a href="#">Comments</a></li>
                  <li><a href="#">Email and SMS</a></li>
                </ul>
              </div>
              { this.props.children }
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountPage;
