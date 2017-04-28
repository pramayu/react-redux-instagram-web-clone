import axios from 'axios';

export const SET_NEW_COMMENT = 'SET_NEW_COMMENT';
export const SET_COMMENT_BY_POST = 'SET_COMMENT_BY_POST';
export const SET_UPDATE_COMMENT = 'SET_UPDATE_COMMENT';
export const SET_DELETE_COMMENT = 'SET_DELETE_COMMENT';
export const SET_NOTIF = 'SET_NOTIF';


export function setNewComment(comment) {
  return {
    type: SET_NEW_COMMENT,
    comment
  }
}

export function setCommentByPost(comments) {
  return {
    type: SET_COMMENT_BY_POST,
    comments
  }
}

export function setUpdateComment(comment) {
  return {
    type: SET_UPDATE_COMMENT,
    comment
  }
}

export function setDeleteComment(commentId) {
  return {
    type: SET_DELETE_COMMENT,
    commentId
  }
}

export function setNotif(notification) {
  return {
    type: SET_NOTIF,
    notification
  }
}

export function addNewComment(post_id, user_id, notice, current_user, data) {
  return dispatch => {
    return axios.post('/comment/add/d90585a8ce9412', data).then((res) => {
      let comment_id = res.data.comment._id;
      dispatch(setNewComment(res.data.comment));
      return axios.get('/a6422857a4d6660a5cc9/6a7ea20fbf/'+post_id+'/0683c919e5/'+user_id+'/3d153d6a0b/'+notice+'/5a65d5e7bf/'+current_user+'/ea1a17ca37/'+comment_id)
        .then((res) => {
          dispatch(setNotif(res.data.notification))
        })
    })
  }
}


export function getCommentByPost() {
  return dispatch => {
    return axios.get('/comment/721f9c73b3b5dc/comment/dj73df9jfhd').then((res) => {
      dispatch(setCommentByPost(res.data.comment))
    })
  }
}


export function getUpdateComment(data, url) {
  return dispatch => {
    return axios.post('/comment/dfe1233610fa6dea/' + url + '/update', data).then((res) => {
      dispatch(setUpdateComment(res.data.comment))
    })
  }
}

export function getDeleteComment(user_id, comment_id) {
  return dispatch => {
    return axios.get('/comment/17df3368c4db0f5972f03b34193b4f4771/' +user_id+ '/delete/' + comment_id).then((res) => {
      dispatch(setDeleteComment(res.data.id))
    })
  }
}
