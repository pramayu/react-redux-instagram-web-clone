import React, { Component } from 'react';
import _ from 'lodash';
import dateAgo from '../../shared/timeago';

class NotifList extends Component {
  render() {
    let { notif } = this.props;

    let { seconds, minute, hour, day, month, year } = dateAgo(notif.created_at)

    let time = null;

    if(!_.isEmpty(seconds)) {
      time = (<span>{seconds}</span>)
    } else if(!_.isEmpty(minute)) {
      time = (<span>{minute}</span>)
    } else if (!_.isEmpty(hour)) {
      time = (<span>{hour}</span>)
    } else if (!_.isEmpty(day)) {
      time = (<span>{day}</span>)
    } else if (!_.isEmpty(month)) {
      time = (<span>{month}</span>)
    } else if (!_.isEmpty(year)) {
      time = (<span>{year}</span>)
    }

    let caption = (
      <span>
        { notif.post_id.length === 0 ? '' : <span className="captr">{notif.post_id[0].caption.substring(0, 15)}...</span>}
      </span>
    )

    let started = null;
    if(notif.notice_type === 'following') {
      started = (
        <span>
          <p className="user_nm">{notif.notified_by[0].localAuth.username} <span className="fg_">started {notif.notice_type} you.</span>
          <span className="fg_ gr_ pull-right">{time}</span></p>
        </span>
      )
    } else {
      started = (
        <span>
          <p className="user_nm">{notif.notified_by[0].localAuth.username} <span className="fg_">{notif.notice_type} your photo</span>
          <span className="fg_ gr_ pull-right">{time}</span></p>
        </span>
      )
    }

    let tertw = (
      <a href="#" className="tro">
        <div className="bg_im" style={{backgroundImage: 'url(' +notif.notified_by[0].avatar+ ')'}}></div>
        { started }
        <div className="cmt_id">
          { notif.comment_id.length === 0 ? caption : <span className="captr">{notif.comment_id[0].comment}</span> }
        </div>
      </a>
    )

    return (
      <li className="notif_">
        { this.props.current_user.user.id === notif.notified_by[0]._id ? '' : tertw}
      </li>
    )
  }
}

export default NotifList;
