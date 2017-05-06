import React, { Component } from 'react';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';
import _ from 'lodash';

class ProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      username: '',
      fullname: '',
      website: '',
      bio: '',
      email: '',
      phone: '',
      gender: '',
      success: '',
      isLoading: false,
      avatar: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.user_info ? nextProps.user_info._id : '',
      username: nextProps.user_info ? nextProps.user_info.localAuth.username : '',
      fullname: nextProps.user_info ? nextProps.user_info.localAuth.fullname : '',
      website: nextProps.user_info.website ? nextProps.user_info.website : '',
      bio: nextProps.user_info.bio ? nextProps.user_info.bio : '',
      email: nextProps.user_info ? nextProps.user_info.localAuth.email : '',
      phone: nextProps.user_info.phone ? nextProps.user_info.phone : '',
      gender: nextProps.user_info.gender ? nextProps.user_info.gender : '',
      avatar: nextProps.user_info.avatar ? nextProps.user_info.avatar : ''
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.setUserEdit(this.state, this.props.current_user.user.username).then(res => {
      this.props.getUpdateToken(this.props.current_user.user.id).then(resx => {
        let that = this;
        setTimeout(function () {
          that.setState({
            username: res.data.user.localAuth.username,
            fullname: res.data.user.localAuth.fullname,
            website: res.data.user.website,
            bio: res.data.user.bio,
            email: res.data.user.localAuth.email,
            phone: res.data.user.phone,
            gender: res.data.user.gender,
            avatar: res.data.user.avatar,
            isLoading: false
          })
        }, 500);
      })
    });
  }

  uploadFile(files) {
    const image = files[0];
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
    let uploadRequest = superagent.post(url);
    uploadRequest.attach('file', image)

    Object.keys(params).map((key) => {
      uploadRequest.field(key, params[key])
    })
    uploadRequest.end((err, res) => {
      if(err) {
        console.log(err);
        return
      }
      this.setState({avatar: res.body.url});
    })
  }

  render() {
    const dropzone = (
      <li className="form-group phone propd">
        <Dropzone onDrop={this.uploadFile.bind(this)} />
        <input type="hidden" name="avatar" onChange={this.handleChange} value={this.state.avatar}/>
      </li>
    )

    const dropandphoto = (
      <li className="form-group phone propd">
        <Dropzone onDrop={this.uploadFile.bind(this)} />
        <span className="bersam" style={{backgroundImage: 'url(' + this.state.avatar + ')'}}></span>
        <input type="hidden" name="avatar" onChange={this.handleChange} value={this.state.avatar}/>
      </li>
    )

    return (
      <form encType='multipart/form-data' onSubmit={this.handleSubmit}>
        <li className="nm"><h4>{this.props.current_user.user.username}</h4></li>
        <li className="form-group fl">
          <input type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname}
            className="form-control" />
        </li>
        <li className="form-group usr">
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username}
            className="form-control" />
        </li>
        <li className="form-group web">
          <input type="text" name="website" onChange={this.handleChange} value={this.state.website}
            className="form-control"/>
        </li>
        <li className="form-group bio">
          <textarea name="bio" rows="3" cols="40" className="form-control" onChange={this.handleChange}
            value={this.state.bio} />
        </li>
        <li className="form-group mail">
          <input type="email" name="email" onChange={this.handleChange} value={this.state.email}
            className="form-control" />
        </li>
        <li className="form-group phone">
          <input type="text" name="phone" onChange={this.handleChange} value={this.state.phone}
            className="form-control" />
        </li>
        <li className="form-group gender">
          <select className="this-gender form-control" name="gender" onChange={this.handleChange} value={this.state.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </li>
        {this.state.avatar ? dropandphoto : dropzone}
        <li className="bgth gret">
          <button type="submit" className="btn btn-f">
            <ul className="list-inline">
              <li className={classnames('isnotLoading', { 'isLoading': this.state.isLoading === true})}>
                <div className="loader-inner ball-pulse">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </li>
              <li>
                SUBMIT
              </li>
            </ul>
          </button>
        </li>
        <div className={classnames('line-scale-pulse-out', {'line-scale-pulse-in': this.state.isLoading === true})}>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </form>
    )
  }
}

export default ProfileForm;
