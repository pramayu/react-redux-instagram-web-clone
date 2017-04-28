import React, { Component } from 'react';
import classnames from 'classnames';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import dateAgo from './timeago';
import _ from 'lodash';
import CommentPage from '../components/comments/comment-page';

class ModalPhoto extends Component {
  render() {
    let { post, user, current_user } = this.props;

    let image = (
      post.images.picture.map((image, index) =>
        <div key={index}>
          <img src={image} alt={post.caption}/>
        </div>
      )
    )

    var settings = {
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1
    };

    let single = (
      <div>
        { image }
      </div>
    )

    let multiple = (
      <Slider {...settings}>
        { image }
      </Slider>
    )

    let votes = [];

    _.map(this.props.votes, (vote) => {
      if(vote.post_id[0] === post._id) {
        if(!_.isEmpty(vote)) {
          votes.push(vote)
        }
      }
    })

    let { seconds, minute, hour, day, month, year } = dateAgo(post.created_at)

    let time = null;

    if(!_.isEmpty(seconds)) {
      time = (<p>{seconds}</p>)
    } else if(!_.isEmpty(minute)) {
      time = (<p>{minute}</p>)
    } else if (!_.isEmpty(hour)) {
      time = (<p>{minute}</p>)
    } else if (!_.isEmpty(day)) {
      time = (<p>{day}</p>)
    } else if (!_.isEmpty(month)) {
      time = (<p>{month}</p>)
    } else if (!_.isEmpty(year)) {
      time = (<p>{year}</p>)
    }

    return (
      <div className="modal fade tersf" id={'foo' + post._id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="img-left img-warghf">
                { post.images.picture.length > 1 ? multiple : single }
                <div className="hover_"></div>
              </div>
              <div className="img-damn">
                <div className="identity">
                  <ul className="list-inline na">
                    <li className="name">
                      <span className="pr" style={{backgroundImage: 'url(' +user.avatar+ ')'}}></span>
                    </li>
                    <li className="udef">
                      <a href="#" className="usr">{user.localAuth.username}</a>
                      <p className="location" title={post.location}><a href="#">{post.location.substring(0, 15)}</a></p>
                    </li>
                    {/*<li className="geo">
                      <a href={'/user/' + user.localAuth.username} className="follback">Following</a>
                    </li> */}
                  </ul>
                </div>
                <div className="the-comment">
                  <div className="vote">
                    <ul className="list-inline foe">
                      <li className="se">
                        <span className="fa fa-heart"></span><span className="number"> { votes.length } { votes.length > 1 ? 'likes' : 'like '}</span>
                      </li>
                      <li className="so">
                        <span>{time}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="caption">
                    <p className="dfre"><span className="userna">{user.localAuth.username}</span> {post.caption}</p>
                    <div className="isi-com">
                      <CommentPage user={user} current_user={current_user} post={post} votes={this.props.votes}/>
                    </div>
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

function mapStateToProps(state) {
  let votes = Object.assign([], state.votes);
  return {
    votes: votes
  }
}

export default connect(mapStateToProps)(ModalPhoto);
