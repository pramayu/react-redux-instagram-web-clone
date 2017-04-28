import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: false,
      comment: '',
      user_id: this.props.current_user ? this.props.current_user.user.id : '',
      post_id: this.props.post ? this.props.post._id : ''
    }
    this.handleAddVote = this.handleAddVote.bind(this)
    this.handleDelVote = this.handleDelVote.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddVote(e) {
    e.preventDefault();
    this.props.addNewVote(this.props.current_user.user.id, this.props.post._id).then(
      () => {
        this.props.getNewNotification(this.props.post._id, this.props.post.user_id[0]._id, 'liked', this.props.current_user.user.id).then((res) => {})
      },
      () => {
        this.setState({ vote: true })
      }
    )
  }

  handleDelVote(e) {
    e.preventDefault();
    this.props.getDeleteVote(this.props.post._id, this.props.current_user.user.id).then((res) => {
      this.setState({ vote: false })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewComment(this.props.post._id, this.props.post.user_id[0]._id, 'commented', this.props.current_user.user.id, this.state).then(
      this.setState({ comment: ''})
    )
  }

  checkVote (data) {
    let voter = _.find(data, (vt) => {
      return vt.user_id[0]._id === this.props.current_user.user.id && vt.post_id[0] === this.props.post._id
    })
    return {
      voter: !_.isEmpty(voter)
    }
  }
  render() {
    let { post, current_user } = this.props;
    let vts = Object.assign([], this.props.votes)
    let { voter } = this.checkVote(vts)
    return (
      <form onSubmit={this.handleSubmit}>
        { voter === this.state.vote ? <a className="like_btn" id={post._id} onClick={this.handleAddVote}>like</a> :
        <a className="like_btn red_btn" id={post._id} onClick={this.handleDelVote}>dislike</a>
        }
        <input type="text" name="comment" onChange={this.handleChange} value={this.state.comment} placeholder="Add Comment..." className="njhg" />
        <input type="hidden" name="user_id" disabled onChange={this.handleChange} value={this.state.user_id} />
        <input type="hidden" name="post_id" disabled onChange={this.handleChange} value={this.state.post_id} />
      </form>
    )
  }
}

export default CommentForm;
