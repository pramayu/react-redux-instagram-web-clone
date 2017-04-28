import React, { Component } from 'react';
import _ from 'lodash';
import Carousel from 'nuka-carousel';

import dateAgo from '../../shared/timeago';
import CommentForm from './comment_form';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: '',
      comment: '',
      user_id: this.props.current_user.user.id,
      post_id: this.props.post._id
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editComment(e) {
    this.props.comments.map((comment) => {
      if(comment.post_id[0] === this.props.post._id) {
        if(comment.user_id[0]._id === this.props.current_user.user.id) {
          if(e === comment._id) {
            this.setState({
              comment: comment ? comment.comment : '',
              editing: e
            })
          }
        }
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.comments.map((comment) => {
      if(comment.post_id[0] === this.props.post._id) {
        if(comment.user_id[0]._id === this.props.current_user.user.id) {
          this.props.getUpdateComment(this.state, comment._id).then((res) => {
            this.setState({ editing: !comment._id})
          })
        }
      }
    })
  }

  unEditHandle(e) {
    this.setState({ editing: !e})
  }

  handleDelete(e) {
    this.props.getDeleteComment(this.props.current_user.user.id, e)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { post, current_user } = this.props;
    let userpost = Object.assign({}, this.props.post.user_id[0].localAuth)

    let { seconds, minute, hour, day, month, year } = dateAgo(post.created_at)

    let time = null;

    if(!_.isEmpty(seconds)) {
      time = (<p>{seconds}</p>)
    } else if(!_.isEmpty(minute)) {
      time = (<p>{minute}</p>)
    } else if (!_.isEmpty(hour)) {
      time = (<p>{hour}</p>)
    } else if (!_.isEmpty(day)) {
      time = (<p>{day}</p>)
    } else if (!_.isEmpty(month)) {
      time = (<p>{month}</p>)
    } else if (!_.isEmpty(year)) {
      time = (<p>{year}</p>)
    }

    let location = (
      <li className="name">
        <p className="usr"><a href={'/user/' + userpost.username}><b>{userpost.username}</b></a></p>
        <span>{post.location}</span>
      </li>
    )

    let notlocation = (
      <li className="name">
        <p className="sudr"><b>{userpost.username}</b></p>
      </li>
    )

    let image = (
      post.images.picture.map((image, index) =>
        <div key={index}>
          <img src={image} alt={post.caption}/>
        </div>
      )
    )

    let single = (
      <div>
        { image }
      </div>
    )

    let multiple = (
      <Carousel >
        { image }
      </Carousel>
    )

    let votes = [];
    let cmts = [];

    _.map(this.props.votes, (vote) => {
      if(vote.post_id[0] === post._id) {
        if(!_.isEmpty(vote)) {
          votes.push(vote)
        }
      }
    })

    _.map(this.props.comments, (comment) => {
      if(comment.post_id[0] === post._id) {
        if(!_.isEmpty(comment)) {
          cmts.push(comment);
        }
      }
    })

    let comments = (
      this.props.comments.map((comment, id) => {
        if(comment.post_id[0] === post._id) {
          return (
            <li className="caption" key={id}>
              { comment.user_id[0]._id === current_user.user.id && this.state.editing === comment._id && current_user.isAuthenticated === true ?
                <form onSubmit={this.handleSubmit}>
                  <input type="text" autoComplete="off" value={this.state.comment} onChange={this.handleChange} className="edit23746384 edit8735" name="comment" />
                  <input type="hidden" name="user_id" value={this.state.user_id}/>
                  <input type="hidden" name="post_id" value={this.state.post_id}/>
                  <span className="fa fa-close kd098" onClick={this.unEditHandle.bind(this, comment._id)}></span>
                </form>
              :
              <div>
                <a href={'/user/' + comment.user_id[0].localAuth.username} className="name">{ comment.user_id[0].localAuth.username }</a>
                <span> { comment.comment }</span><br/>
                { comment.user_id[0]._id === current_user.user.id ? <i className="foo_f">
                  <i className="fa fa-edit" onClick={this.editComment.bind(this, comment._id)}></i>
                  <i className="fa fa-trash-o" onClick={this.handleDelete.bind(this, comment._id)}></i></i> : '' }
              </div>
              }
            </li>
          )
        }
      })
    )

    let likers = (
      this.props.votes.map((vote, id) => {
        if(vote.post_id[0] === post._id) {
          return (
            <span className="fy" key={id}>
              <span className="fi"> {vote.user_id[0].localAuth.username}, </span>
            </span>
          )
        }
      })
    )

    return (
      <div className="isi-data">
        <div className="title">
          <ul className="list-inline kj">
            <li className="photo">
              <span className="pic_" style={{backgroundImage: 'url(' + post.user_id[0].avatar + ')'}}></span>
            </li>
            { !_.isEmpty(post.location) ? location : notlocation }
            <li className="cvf">
              { time }
            </li>
          </ul>
        </div>
        <div className="img-df">
          { post.images.picture.length > 1 ? multiple : single }
        </div>
        <div className="capcom">
          <div>
            <p className="lke">
              {votes.length > 6 ? votes.length : likers} {votes.length > 6 ? ' likes' : <span>{ votes.length === 0 ? votes.length + ' like' : 'like this'}</span>} 
            </p>
          </div>
          <ul className="list-unstyled khg">
            <li className="caption">
              <a href={'/user/' + userpost.username} className="name">{userpost.username}</a> <span>{post.caption}</span>
              { cmts.length > 6 ? <p className="count-com"><a href="#" className="comen">load more comments</a></p> : ''}
            </li>
            { comments }
          </ul>
        </div>
        <div className="frm-com">
          <div className="kjwq">
            <CommentForm votes={this.props.votes} current_user={this.props.current_user} addNewComment={this.props.addNewComment}
              comments={this.props.comments} post={this.props.post} addNewVote={this.props.addNewVote} getDeleteVote={this.props.getDeleteVote}
              getNewNotification={this.props.getNewNotification} />
          </div>
        </div>
      </div>
    )
  }
}


export default PostList;
