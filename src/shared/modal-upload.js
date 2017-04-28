import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import _ from 'lodash';
import sha1 from 'sha1';
import axios from 'axios';

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      url_images: [],
      public_id: [],
      location: '',
      caption: '',
      success: false,
      token: localStorage.jwtToken ? localStorage.jwtToken : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.deleteTempImage = this.deleteTempImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
        let uploaded = res.body;
        let updateImages = Object.assign([], this.state.images);
        updateImages.push(uploaded);

        let url_image = res.body.url;
        let urlImages = Object.assign([], this.state.url_images);
        urlImages.push(url_image);

        let public_id = res.body.public_id
        let public_ids = Object.assign([], this.state.public_id);
        public_ids.push(public_id);

        this.setState({ images: updateImages, url_images: urlImages, public_id: public_ids });
      })
    })
  }

  deleteTempImage(e) {
    e.preventDefault()
    let target_id = e.target.id;
    this.state.images.map((image, id) => {
      if(id.toString() === target_id) {
        this.props.deleteTempImage(image.public_id)
      }
    })
    let urlImages = Object.assign([], this.state.url_images);
    urlImages.splice(target_id, 1);

    let updateImages = Object.assign([], this.state.images);
    updateImages.splice(target_id, 1);

    let updatePublicId = Object.assign([], this.state.public_id);
    updatePublicId.splice(target_id, 1);
    this.setState({ url_images: urlImages, images: updateImages, public_id: updatePublicId })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewPost(this.state).then(() => {
      this.setState({
        url_images: [],
        location: '',
        caption: ''
      })
    })
  }

  handleLocation(e) {

    let onPositionReceives = (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getAddress(latitude, longitude);
    }

    let errorHandler = (err) => {
      if(err.code == 1) {
        alert("Error: Access is denied!");
      }else if( err.code == 2) {
        alert("Error: Position is unavailable!");
      }
    }

    if(navigator.geolocation) {
      let options = {enableHighAccuracy:true,maximumAge:30000,timeout:27000};
      navigator.geolocation.watchPosition(onPositionReceives, errorHandler, options)
    }

    let getAddress = (latitude, longitude) => {
      let url = "http://maps.google.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";
      let uploadRequest = superagent.post(url);
        uploadRequest.end((err, res) => {
          let address = res.body.results[0].address_components;
          console.log(address)
          let myAddress = address[4].long_name + ', ' + address[5].long_name
          this.setState({location: myAddress})
        })
    }

  }

  render() {
    let noPic = (
      <div className="form-group uplo_ no_pic">
        <Dropzone multiple={true} onDrop={this.uploadFile.bind(this)} />
      </div>
    );
    let existPic = (
      <div className="form-group uplo_ wt_pic">
        <ul className="list-inline">
          {this.state.url_images.map((lstImage, key) =>
            <li key={key} className="lkjr">
              <span className="lst-image" style={{backgroundImage: 'url(' + lstImage + ')'}}>
                <span className="closex" id = {key} onClick={this.deleteTempImage}></span>
              </span>
              <div className="clear fos"></div>
            </li>
          )}
        </ul>
        <input type="hidden" name="url_images" onChange={this.handleChange} value={this.state.url_images} />
        <input type="hidden" name="public_id" onChange={this.handleChange} value={this.state.public_id} />
      </div>
    );
    return (
      <div className="modal fade break_" id="upload" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Upload Photo</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group marker">
                  <input type="text" name="location" className="form-control" placeholder="Places"
                    onChange={this.handleChange} value={this.state.location}/>
                  <span onClick={this.handleLocation} className="fa fa-map-marker"></span>
                </div>
                <div className="form-group">
                  <textarea name="caption" rows="3" cols="40" placeholder="Description" className="form-control"
                    onChange={this.handleChange} value={this.state.caption}/>
                </div>
                { !_.isEmpty(this.state.url_images) === true ? existPic : noPic }
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
  }
}

export default ModalUpload;
