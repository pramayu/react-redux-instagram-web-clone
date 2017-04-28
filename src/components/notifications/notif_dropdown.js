import React, { Component } from 'react';
import _ from 'lodash';
import NotifList from './notif_list';

class Notification extends Component {
  componentDidMount() {
    this.props.getAllNotification(this.props.current_user.user.id)
  }
  render() {
    let { notifications } = this.props;
    let notification = (
      this.props.notifications.reverse().map((notif, id) =>
        <NotifList notif={notif} key={id} current_user={this.props.current_user}/>
      )
    )

    let empty = (
      <li className="dfe_">
        <p className="ew">You don't have notifications</p>
      </li>
    )

    return (
      <ul className="list-unstyled dropdown-menu drp-mnu" id="notifs">
        { _.isEmpty(notifications) ? empty : notification }
      </ul>
    )
  }
}

export default Notification;
