import React, { Component } from 'react';
import _ from 'lodash';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      user_id: props.current_user.user.id,
      post_id: props.post._id,
      success: false,
      vote: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddVote = this.handleAddVote.bind(this)
    this.handleDelVote = this.handleDelVote.bind(this)
  }

  checkVote (data) {
    let voter = _.find(data, (vt) => {
      return vt.user_id[0] === this.props.current_user.user.id && vt.post_id[0] === this.props.post._id
    })
    return {
      voter: !_.isEmpty(voter)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewComment(this.props.post._id, this.props.post.user_id[0], 'commented', this.props.current_user.user.id, this.state).then(
      this.setState({ comment: ''})
    )
  }

  handleAddVote(e) {
    e.preventDefault();
    this.props.addNewVote(this.props.current_user.user.id, this.props.post._id).then((res) => {
      this.setState({ vote: true })
    })
  }

  handleDelVote(e) {
    e.preventDefault();
    this.props.getDeleteVote(this.props.post._id, this.props.current_user.user.id).then((res) => {
      this.setState({ vote: false })
    })
  }


  render() {

    let { post, user, current_user } = this.props;

    let votes = Object.assign([], this.props.votes)

    let { voter } = this.checkVote(votes)

    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="list-inline">
          <li className="vot">
            { voter === this.state.vote ?
              <span className="lke add" onClick={this.handleAddVote}></span> : <span className="lke del" onClick={this.handleDelVote}></span> }
          </li>
          <li className="come">
            <input type="text" name="comment" placeholder="Add a comments..."
              className="form-control frm-com" value={this.state.comment} onChange={this.handleChange}/>
            <input type="hidden" name="user_id" value={this.state.user_id}/>
            <input type="hidden" name="post_id" value={this.state.post_id}/>
          </li>
        </ul>
      </form>
    )
  }
}

export default CommentForm;
