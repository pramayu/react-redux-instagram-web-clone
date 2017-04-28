import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { browserHistory } from 'react-router';
import Navbar from '../../shared/navbar';
import { getUserPage, deleteTempImage, addNewPost, getUserPost, getDeleteImage, getUpdatePost, removeUserPost } from '../../actions/user-page';
import { setUserLogout } from '../../actions/signin';
import { getFollowUser, getAllFollowUser, setFollowingUser, getDeleteFollowUser, getDeleteFollowingUser } from '../../actions/relationships';
import { getFollowerNotif } from '../../actions/notifications';
import ModalUpload from '../../shared/modal-upload';
import ModalPhoto from '../../shared/modal-photo';
import UserPageList from './user-page-list';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      username: '',
      fullname: '',
      website: '',
      bio: '',
      avatar: '',
      phone: '',
      posts: []
    }
    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
  }
  componentWillMount() {
    this.props.getUserPage(this.props.params.user_pg);
    this.props.getUserPost(this.props.params.user_pg);
    this.props.getAllFollowUser(this.props.params.user_pg);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.user_pg.user ? nextProps.user_pg.user._id : '',
      username: nextProps.user_pg.user ? nextProps.user_pg.user.localAuth.username : '',
      fullname: nextProps.user_pg.user ? nextProps.user_pg.user.localAuth.fullname : '',
      website: nextProps.user_pg.user ? nextProps.user_pg.user.website : '',
      bio: nextProps.user_pg.user ? nextProps.user_pg.user.bio : '',
      avatar: nextProps.user_pg.user ? nextProps.user_pg.user.avatar : '',
      phone: nextProps.user_pg.user ? nextProps.user_pg.user.phone : '',
      posts: nextProps.posts ? nextProps.posts : [],
    })
  }

  setUserLogout(e) {
    this.props.setUserLogout();
    browserHistory.push('/signin')
  }

  followUser(e) {
    e.preventDefault();
    this.props.getFollowUser(this.props.current_user.user.id, this.state._id).then((res) => {
      this.props.setFollowingUser(this.props.current_user.user.id, this.state._id).then((res) => {
        this.props.getFollowerNotif(this.state._id, this.props.current_user.user.id, 'following')
      })
    })
  }

  unfollowUser(e) {
    e.preventDefault();
    this.props.getDeleteFollowUser(this.props.current_user.user.id, this.state._id).then((res) => {
      this.props.getDeleteFollowingUser(this.props.current_user.user.id, this.state._id)
    })
  }

  render() {
    const existPhoto = (
      <div className="img_pp">
          <span className="kono" style={{backgroundImage: 'url(' + this.state.avatar + ')'}}></span>
      </div>
    )

    const defPhoto = (
      <div className="img_pp">
          <span className="kono" style={{backgroundImage: 'url(/images/default/profile.png)'}}></span>
      </div>
    )

    const isUser = (
      <div className="inlu">
        <h2 className="name_">{this.state.username}</h2>
        <a href="/accounts/edit" className="btn-follow prof">Profile</a>
        <a href="#" className="btn-arrow uplo" data-toggle="modal" data-target="#upload"><span className="glyphicon glyphicon-picture"></span></a>
        <a href="#" className="options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">bg</a>
        <ul className="dropdown-menu">
          <li><a onClick={this.setUserLogout.bind(this)}>Logout</a></li>
        </ul>
      </div>
    )

    const isFollowing = (
      <div className="inlu">
        <h2 className="name_">{this.state.username}</h2>
        <a href="#" className="btn-follow" onClick={this.unfollowUser}>Following</a>
        <a href="#" className="options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">bg</a>
        <ul className="dropdown-menu">
          <li><a onClick={this.setUserLogout.bind(this)}>Logout</a></li>
        </ul>
      </div>
    )

    const isLogin = (
      <div className="inlu">
        <h2 className="name_">{this.state.username}</h2>
        <div id="following">
          <a id="foobar" onClick={this.followUser} className="btn-follow prof ytf">Follow</a>
        </div>
        <a href="#" className="options dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">bg</a>
        <ul className="dropdown-menu">
          <li><a onClick={this.setUserLogout.bind(this)}>Logout</a></li>
        </ul>
      </div>
    )

    const isnotLogin = (
      <div className="inlu">
        <h2 className="name_">{this.state.username}</h2>
        <div id="following">
          <a id="foobar" className="btn-follow prof ytf">Follow</a>
        </div>
      </div>
    )

    let button = null;
    if(this.props.current_user.isAuthenticated === true) {
      if(this.props.current_user.user.id === this.state._id) {
        button = isUser;
      } else if (_.includes(this.props.follower.follower_id, this.props.current_user.user.id)) {
        button = isFollowing;
      } else {
        button = isLogin;
      }
    } else if(this.props.current_user.isAuthenticated === false) {
      button = isnotLogin;
    }


    const { current_user } = this.props;

    const post_list = (
      this.props.posts.reverse().map((post, id) =>
        <div key={id}>
          <UserPageList post={post} current_user={current_user} user={Object.assign({}, this.props.user_pg.user)} posts={this.props.posts}
            deleteTempImage={this.props.deleteTempImage} getDeleteImage={this.props.getDeleteImage} getUpdatePost={this.props.getUpdatePost}
            removeUserPost={this.props.removeUserPost} votes={this.props.votes} comments={this.props.comments}/>
          <ModalPhoto user={Object.assign({}, this.props.user_pg.user)} post={post} current_user={Object.assign({}, this.props.current_user)} />
        </div>
      )
    )

    let follower = Object.assign([], this.props.follower.follower_id)
    let following = Object.assign([], this.props.follower.following_id)

    return (
      <div>
        <Navbar />
          <div className="learning-quicker">
            <div className="container munkf">
              <div className="col-md-4 profile_left">
                { this.state.avatar ? existPhoto : defPhoto }
                <div className="clear"></div>
              </div>
              <div className="col-md-8 profile_right">
                <div className="info_pp">
                  { button }
                  <ul className="list-inline end-this-day">
                    <li><a><strong>{this.props.posts.length}</strong> {this.props.length > 1 ? 'Posts' : 'Post'}</a></li>
                    <li><a href="#"><strong>{follower.length}</strong> {follower.length > 1 ? 'Followers' : 'Follower'}</a></li>
                    <li><a href="#"><strong>{following.length}</strong> Following</a></li>
                  </ul>
                  <div className="dsf">
                    <p className="desc">
                      <b><span className="fulname">{this.state.fullname} </span></b>
                      {this.state.bio} <a href="#" className="websit">#{this.state.website}</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="clear"></div>
              <CSSTransitionGroup transitionName="example" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
                { post_list }
              </CSSTransitionGroup>
            </div>
          </div>
          <ModalUpload deleteTempImage={this.props.deleteTempImage} addNewPost={this.props.addNewPost} />
      </div>
    )
  }
}

UserPage.propTypes = {
  current_user: React.PropTypes.object.isRequired,
  user_pg: React.PropTypes.object.isRequired,
  getUserPage: React.PropTypes.func.isRequired,
  deleteTempImage: React.PropTypes.func.isRequired,
  addNewPost: React.PropTypes.func.isRequired,
  getUserPost: React.PropTypes.func.isRequired,
  getFollowUser: React.PropTypes.func.isRequired,
  getAllFollowUser: React.PropTypes.func.isRequired,
  setFollowingUser: React.PropTypes.func.isRequired,
  getDeleteFollowingUser: React.PropTypes.func.isRequired,
  getDeleteImage: React.PropTypes.func.isRequired,
  removeUserPost: React.PropTypes.func.isRequired,
  getFollowerNotif: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let posts = Object.assign([], state.posts)
  let follower = Object.assign([], state.followers)
  let votes = Object.assign([], state.votes)
  let comments = Object.assign([], state.comments)
  return {
    current_user: state.current_user,
    user_pg: state.user_info,
    posts: posts,
    follower: follower,
    votes: votes,
    comments: comments
  }
}

export default connect(mapStateToProps, {
  getUserPage,
  setUserLogout,
  deleteTempImage,
  addNewPost,
  getUserPost,
  getFollowUser,
  setFollowingUser,
  getDeleteFollowUser,
  getDeleteFollowingUser,
  getDeleteImage,
  getUpdatePost,
  removeUserPost,
  getFollowerNotif,
  getAllFollowUser })(UserPage);
