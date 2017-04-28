import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PostList from './post_list';
import { findPostsByRelation } from '../../actions/user-page';
import { findVotes, addNewVote, getDeleteVote } from '../../actions/votes';
import { getCommentByPost, addNewComment, getUpdateComment, getDeleteComment } from '../../actions/comments';
import { getNewNotification } from '../../actions/notifications';

class MainPage extends Component {

  componentDidMount() {
    this.props.findPostsByRelation(this.props.current_user.user.id)
    this.props.findVotes()
    this.props.getCommentByPost()
  }

  render() {

    let postlst = (
      this.props.posts.map((post, id) =>
        <PostList post={post} key={id} votes={this.props.votes} comments={this.props.comments}
          addNewVote={this.props.addNewVote} getDeleteVote={this.props.getDeleteVote} current_user={this.props.current_user}
          addNewComment={this.props.addNewComment} getUpdateComment={this.props.getUpdateComment} getDeleteComment={this.props.getDeleteComment}
          getNewNotification={this.props.getNewNotification} />
      )
    )

    return (
      <div className="learning-quicker">
        <div className="container munkf">
          <div className="index-post">
            <div className="jsdfhiwuh">
              <CSSTransitionGroup transitionName="example" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
                { postlst }
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let posts = Object.assign([], state.posts)
  let votes = Object.assign([], state.votes)
  let comments = Object.assign([], state.comments)
  return {
    posts: posts,
    votes: votes,
    comments: comments,
    current_user: state.current_user
  }
}

MainPage.propTypes = {
  posts: React.PropTypes.array.isRequired,
  votes: React.PropTypes.array.isRequired,
  comments: React.PropTypes.array.isRequired,
  findPostsByRelation: React.PropTypes.func.isRequired,
  findVotes: React.PropTypes.func.isRequired,
  getCommentByPost: React.PropTypes.func.isRequired,
  addNewVote: React.PropTypes.func.isRequired,
  getDeleteVote: React.PropTypes.func.isRequired,
  addNewComment: React.PropTypes.func.isRequired,
  getUpdateComment: React.PropTypes.func.isRequired,
  getDeleteComment: React.PropTypes.func.isRequired,
  getNewNotification: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  findPostsByRelation,
  findVotes,
  getCommentByPost,
  addNewVote,
  addNewComment,
  getUpdateComment,
  getDeleteComment,
  getNewNotification,
  getDeleteVote })(MainPage);
