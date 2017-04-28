import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../components/search/search';
import { getSearchUser } from '../actions/search';
import { getAllNotification } from '../actions/notifications';
import Notification from '../components/notifications/notif_dropdown';


class Navbar extends Component {

  render() {
    const userNotLogin = (
      <ul className="nav navbar-nav">
        <li className="btno-1_ btrt"><a href="/signup" className="btn-4 asw">Sign up</a></li>
        <li className="btno-3_ btrt"><a href="/signin" className="btn-5 asw">Log in</a></li>
      </ul>
    );

    const userLogin = (
      <ul className="nav navbar-nav">
        <li className="btn-1_ btro"><a href="#" className="btn-1 icon">btn-1</a></li>
        <li className="btn-2_ btro"><a href="#" className="btn-2 icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">btn-2</a>
          <Notification getAllNotification={this.props.getAllNotification} notifications={this.props.notifications} current_user={this.props.auth}/>
        </li>
        <li className="btn-3_ btro"><a href={'/user/' + this.props.auth.user.username} className="btn-3 icon">btn-3</a></li>
      </ul>
    );

    let { isAuthenticated } = this.props.auth;

    let usersrc = (
      this.props.search.map((user, id) => {
        return (
          <li key={id} className="kfy">
            <a href={'/user/'+user.localAuth.username} className="to">
              <span className="imf" style={{backgroundImage: 'url(' +user.avatar+ ')'}}></span>
              <p className="sd">
                <span className="username">{user.localAuth.username}</span><br/>
                <span className="full">{user.localAuth.fullname}</span>
              </p>
            </a>
          </li>
        )
      })
    )

    return (
      <div className="navbar navbar-default _this_nav">
        <div className="container farewell">
          <div className="navbar-header">
            {/*<a href="/" className="navbar-brand logo_"></a> */}
            <a href="/" className="navbar-brand logo_2">_Khilogram.</a>
          </div>
          <div className="navbar-search">
            <Search getSearchUser={this.props.getSearchUser}/>
            { !_.isEmpty(this.props.search) ?
            <ul className="list-unstyled usersrc">
              {usersrc}
            </ul> : '' }
          </div>
          { isAuthenticated === true ? userLogin : userNotLogin }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let search = Object.assign([], state.search);
  let notifications = Object.assign([], state.notifications)
  return {
    auth: state.current_user,
    search: search,
    notifications: notifications,
  }
}

Navbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  getSearchUser: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  getAllNotification: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getSearchUser, getAllNotification })(Navbar);
