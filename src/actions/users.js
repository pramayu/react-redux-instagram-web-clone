import axios from 'axios';

export const SET_USER_INFO = 'SET_USER_INFO';

export function setUserInfo(user) {
  return {
    type: SET_USER_INFO,
    user
  }
}

export function getUserInfo(identifier) {
  return dispatch => {
    return axios.get(`/user/profile/${identifier}/edit`)
      .then(res => dispatch(setUserInfo(res.data.user)));
  }
}
export function setUserEdit(data, identifier) {
  return dispatch => {
    return axios({
      method: 'put',
      url: `/user/profile/${identifier}/edit`,
      data: data,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export function checkPassword(user_id, token) {
  return dispatch => {
    return axios.get('/user/password/' + user_id + '/check?token=' + token);
  }
}

export function updateUserPassword(data, user_id) {
  return dispatch => {
    return axios({
      method: 'put',
      url: `/user/d8036b0645e8/${user_id}/update`,
      data: data,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export function setResetPassword(payload) {
  return dispatch => {
    return axios.get(`/user/584c8be38c4d0/${payload}/reset`)
  }
}

export function setNewPassword(params, data) {
  return dispatch => {
    return axios({
      method: 'post',
      url: `/user/9e670ac51f92c3d9ec6ea/${params}/410126ac871da60`,
      data: data,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}
