import axios from 'axios';

export const SET_USER_PAGE = 'SET_USER_PAGE';
export const SET_USER_POST = 'SET_USER_POST';
export const ADD_POST = 'ADD_POST';
export const UPDATE_USER_POST = 'UPDATE_USER_POST';
export const SET_REMOVE_POST = 'SET_REMOVE_POST';
export const SET_POST_BY_RELATION = 'SET_POST_BY_RELATION';

export function setUserPage (user) {
  return {
    type: SET_USER_PAGE,
    user
  }
}

export function setUserPost (posts) {
  return {
    type: SET_USER_POST,
    posts
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function setDeleteImage(post) {
  return {
    type: UPDATE_USER_POST,
    post
  }
}

export function setRemovePost(postId) {
  return {
    type: SET_REMOVE_POST,
    postId
  }
}

export function setFindPostByRelation(posts) {
  return {
    type: SET_POST_BY_RELATION,
    posts
  }
}

export function getUserPage(payload) {
  return dispatch => {
    return axios.get('/accounts/86824ed62f70a8544b80fdfb15fe/' + payload + '/niputu')
    .then(res => dispatch(setUserPage(res.data.user)));
  }
}


export function deleteTempImage(payload) {
  return dispatch => {
    return axios.get('/posts/images/remove/' + payload + '/storage')
  }
}

export function addNewPost(data) {
  return dispatch => {
    return axios.post('/posts/6a232700b90653d8a5ad04/picture/upload', data).then((res) => {
      dispatch(addPost(res.data.post))
    })
  }
}

export function getUserPost(payload) {
  return dispatch => {
    return axios.get('/posts/6d1021deb2eff884b76f27f56/' +payload+ '/user').then((res) => {
      dispatch(setUserPost(res.data.post))
    })
  }
}

export function getDeleteImage(post_id, target_id) {
  return dispatch => {
    return axios.get('/posts/69dee2745fde0dcdb6c5/' + post_id + '/16803424a998f29c13bc/' + target_id + '/f4ff6e230e71a06e8cf1').then((res) => {
      dispatch(setDeleteImage(res.data.post))
    })
  }
}

export function getUpdatePost(post_id, data) {
  return dispatch => {
    return axios.post('/posts/fa24372a8bbda02037ac/' + post_id + '/286c47e43750761b7738', data).then((res) => {
      dispatch(setDeleteImage(res.data.post))
    })
  }
}

export function removeUserPost(user_id, post_id) {
  return dispatch => {
    return axios.get('/posts/ed73bb1ef9c087428004/' +user_id+ '/ca037e9507e5d1537a3c/' +post_id+ '/016a89cd3337738120b81253193bae2b523f6b56').then((res) => {
      dispatch(setRemovePost(res.data.id))
    })
  }
}

export function findPostsByRelation(user_id) {
  return dispatch => {
    return axios.get('/posts/c9c6093e0597aae6697c/' +user_id+ '/fe8b22bf1a8ac6a176a73cc0cfbbbb50bc3eef492805d2b7fb98801123c9162d').then((res) => {
      dispatch(setFindPostByRelation(res.data.posts))
    })
  }
}
