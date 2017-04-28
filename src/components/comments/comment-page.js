import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CommentForm from './comment-form';
import { addNewComment, getCommentByPost, getUpdateComment, getDeleteComment } from '../../actions/comments';
import { addNewVote, getAllVote, getDeleteVote } from '../../actions/votes';

class CommentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: '',
      comment: '',
      user_id: this.props.current_user.user.id,
      post_id: this.props.post._id
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getCommentByPost()
    this.props.getAllVote()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  render() {
    let { post, user, current_user, addNewComment, addNewVote, votes, getDeleteVote } = this.props;

    const comment = (
      this.props.comments.map((comment, id) => {
        if(comment.post_id[0] === post._id) {
          return (
            <li key={id}>
              { comment.user_id[0]._id === current_user.user.id && this.state.editing === comment._id && current_user.isAuthenticated === true ?
                <form onSubmit={this.handleSubmit}>
                  <span className="fa fa-close sw" onClick={this.unEditHandle.bind(this, comment._id)}></span>
                  <input type="text" value={this.state.comment} onChange={this.handleChange} className="edit23746384" name="comment" />
                  <input type="hidden" name="user_id" value={this.state.user_id}/>
                  <input type="hidden" name="post_id" value={this.state.post_id}/>
                </form>
              :
                <p className="dfre">
                  <span className="userna">{ comment.user_id[0].localAuth.username }</span> {comment.comment}
                  {
                    current_user.user.id === comment.user_id[0]._id && current_user.isAuthenticated === true ?
                      <span className='ano'>
                        <br/>
                        <span className="fa fa-edit" onClick={this.editComment.bind(this, comment._id)}></span>
                        <span className="fa fa-trash-o" onClick={this.handleDelete.bind(this, comment._id)}></span>
                      </span>
                    :
                    ''
                  }
                </p>
              }
            </li>
          )
        }
      })
    )

    let unAuthenticated = (
      <div className="for">
        <a href="/signin" className="log_in">Log in</a><span className="fh"> to like or comment</span>
      </div>
    )

    return (
      <div>
        <ul className="list-unstyled">
          { comment }
        </ul>
        <div className="comment-input">
          {current_user.isAuthenticated === false ? unAuthenticated : <CommentForm user={user} current_user={current_user} post={post} addNewComment={addNewComment}
            addNewVote={addNewVote} votes={votes} getDeleteVote={getDeleteVote}/> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let comments = Object.assign([], state.comments);
  return {
    comments: comments
  }
}

export default connect(mapStateToProps, {
  addNewComment, getCommentByPost, addNewVote, getAllVote, getDeleteVote, getUpdateComment, getDeleteComment
})(CommentPage);
