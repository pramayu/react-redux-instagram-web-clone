import axios from 'axios';


export const SET_NEW_NOTIFICATION = 'SET_NEW_NOTIFICATION';
export const SET_ALL_NOTIFICATION = 'SET_ALL_NOTIFICATION';


export function setNewNotification(notification) {
  return {
    type: SET_NEW_NOTIFICATION,
    notification
  }
}

export function setAllNotification(notifications) {
  return {
    type: SET_ALL_NOTIFICATION,
    notifications
  }
}

export function getNewNotification(post_id, user_id, notice, current_user) {
  return dispatch => {
    return axios.get('/a6422857a4d6660a5cc9/f88f77d4a858488737a/'+post_id+'/767f4bea883ecabbc5ab/'+user_id+'/68b6ce328961fa538af5/'+notice+'/5a65d5e7bf/'+current_user)
    .then((res) => {
      dispatch(setNewNotification(res.data.notification))
    })
  }
}

export function getAllNotification(user_id) {
  return dispatch => {
    return axios.get('/a6422857a4d6660a5cc9/f858557f36b3d62ee70c/' +user_id+ '/2b4392ee6da4f0b8630d9a7d3cedcd6386b113e0b09605e031b76a2299e4').then((res) => {
      dispatch(setAllNotification(res.data.notifications))
    })
  }
}

export function getFollowerNotif(user_id, current_user, notice) {
  return dispatch => {
    return axios.get('/a6422857a4d6660a5cc9/4e942e5f7d/' +user_id+ '/415902fdaf2b7e3767e5/' +current_user+ '/b6fb55252c/' +notice+ '/adc2966d80').then((res) => {
      dispatch(setNewNotification(res.data.notification))
    })
  }
}
