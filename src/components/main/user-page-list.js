import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import _ from 'lodash';
import sha1 from 'sha1';

class UserPageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      location: '',
      caption: '',
      images: [],
      public_id: [],
      modal: '',
      token: props.current_user.user ? this.props.current_user.user.id : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.deleteTempImage = this.deleteTempImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  deleteTempImage(e) {
    e.preventDefault()
    let target_id = e.target.id;
    this.state.public_id.map((public_id, id) => {
      if(id.toString() === target_id) {
        this.props.deleteTempImage(public_id)
      }
    })

    let imgRemove = target_id;
    this.props.getDeleteImage(this.state._id, target_id)

    let updateImages = Object.assign([], this.state.images);
    updateImages.splice(target_id, 1);

    let updatePublicId = Object.assign([], this.state.public_id);
    updatePublicId.splice(target_id, 1);

    this.setState({ images: updateImages, public_id: updatePublicId })
  }

  updatePost(e) {
    let post = _.find(this.props.posts, (post) => {
      if(post._id === e) {
        let images = Object.assign([], post.images.picture);
        let public_id = Object.assign([], post.images.public_id);
        this.setState({
          location: post.location,
          caption: post.caption,
          images: images,
          public_id: public_id,
          modal: e,
          _id: e
        })
      }
    })
  }

  uploadFile(files) {
    const image = Object.assign([], files);
    const cloudname = 'foo';
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;
    const timestamp = Date.now() / 1000;
    const uploadPreset = 'jv4jvfwr';
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'vNJ4wz7V5pAbSlBlCnjvBvFyXvo';
    const signature = sha1(paramsStr);
    const params = {
      'api_key': '933274521521578',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }
    image.map((img, id) => {
      let uploadRequest = superagent.post(url);
      uploadRequest.attach('file', image[id])
      Object.keys(params).map((key) => {
        uploadRequest.field(key, params[key])
      })
      uploadRequest.end((err, res) => {
        if(err) {
          console.log(err);
          return
        }
        let url_image = res.body.url;
        let urlImages = Object.assign([], this.state.images);
        urlImages.push(url_image);

        let public_id = res.body.public_id
        let public_ids = Object.assign([], this.state.public_id);
        public_ids.push(public_id);

        this.setState({ images: urlImages, public_id: public_ids });
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getUpdatePost(this.props.post._id, this.state).then((res) => {
      this.setState({
        location: '',
        caption: '',
        images: [],
        public_id: []
      })
    })
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.removeUserPost(this.props.current_user.user.id, this.props.post._id)
  }

  render() {

    let { current_user, user, post, posts } = this.props;

    let votes = [];
    let comments = [];

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
          comments.push(comment)
        }
      }
    })

    let no_post = (
      <div>
        <h3 className="text-center">Start capturing and sharing your moments.</h3>
        <p className="text-center">Get the app to share your first photo or video.</p>
      </div>
    )

    let updateBtn = (
      <ul className="list-inline roket">
        <li><span className="fa fa-trash-o" onClick={this.handleRemove}></span></li>
        <li><span className="fa fa-pencil" data-toggle="modal" data-target={'#update_' + post._id} onClick={this.updatePost.bind(this, post._id)}></span></li>
      </ul>
    )

    let within_post = (
      <div className="col-md-4 grd">
        <div className="img-gal">
          <div className="bg" style={{backgroundImage: 'url(' +this.props.post.images.picture[0]+ ')'}}></div>
          <div className="clear sjfdfh"></div>
        </div>
        { current_user.isAuthenticated === true && current_user.user.id === user._id ? updateBtn : ''}
        <a href="" className="_gdgr" data-toggle="modal" data-target={'#foo' + this.props.post._id}>
          <ul className="list-inline radikal">
            <li><span className="fa fa-heart"></span><span className="counter">{ votes.length }</span></li>
            <li><span className="fa fa-comment"></span><span className="counter">{ comments.length }</span></li>
          </ul>
        </a>
      </div>
    )

    let noPic = (
      <div className="form-group uplo_ no_pic">
        <Dropzone multiple={true} onDrop={this.uploadFile.bind(this)} />
      </div>
    );
    let existPic = (
      <div className="form-group uplo_ wt_pic">
        <ul className="list-inline">
          {this.state.images.map((lstImage, key) =>
            <li key={key} className="lkjr">
              <span className="lst-image" style={{backgroundImage: 'url(' + lstImage + ')'}}>
                <span className="closex" id={key} onClick={this.deleteTempImage}></span>
              </span>
              <div className="clear fos"></div>
            </li>
          )}
        </ul>
        <input type="hidden" name="images" onChange={this.handleChange} value={this.state.images} />
        <input type="hidden" name="public_id" onChange={this.handleChange} value={this.state.public_id} />
      </div>
    );

    let modalUpdate = (
      <div className="modal fade break_" id={'update_' + post._id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Updated Photo</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group marker">
                  <input type="text" name="location" className="form-control" placeholder="Places"
                    value={this.state.location} onChange={this.handleChange}/>
                  <span className="fa fa-map-marker"></span>
                </div>
                <div className="form-group">
                  <textarea name="caption" rows="3" cols="40" placeholder="Description" className="form-control"
                    value={this.state.caption} onChange={this.handleChange}/>
                </div>
                { !_.isEmpty(this.state.images) === true ? existPic : noPic }
                <input type="hidden" name="token" value={this.state.token}/>
                <div className="bdhf pull-right">
                  <button type="submit" className="btn bh">UPLOAD</button>
                </div>
                <div className="clear"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )


    return (
      <div>
        <div className="isi-photo">
          { this.props.post.length === 0 ? no_post : within_post }
        </div>
        { this.state.modal === post._id ? modalUpdate : ''}
      </div>
    )
  }
}

export default UserPageList;
