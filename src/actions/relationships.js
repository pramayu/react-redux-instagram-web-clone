import axios from 'axios';


export const SET_FOLLOW_USER = 'SET_FOLLOW_USER';
export const SET_ALL_FOLLOW_USER = 'SET_ALL_FOLLOW_USER';
export const SET_DELETE_FOLLOWER = 'SET_DELETE_FOLLOWER';


export function setFollowUser(follow) {
  return {
    type: SET_FOLLOW_USER,
    follow
  }
}

export function setAllFollowUser(follow) {
  return {
    type: SET_ALL_FOLLOW_USER,
    follow
  }
}

export function setDeleteFollowUser(follower) {
  return {
    type: SET_DELETE_FOLLOWER,
    follower
  }
}

export function getFollowUser(current_user, user_id) {
  return dispatch => {
    return axios.post('/relationships/a81eb2ad2a1a1283f802/' +current_user+ '/following/' +user_id+ '/40a1c85568ae04617a97').then((res) => {
      dispatch(setFollowUser(res.data.relationship[0]))
    })
  }
}

export function getAllFollowUser(user_id) {
  return dispatch => {
    return axios.get('/relationships/897cc6ae25d5620eec50/' +user_id+ '/cdcf39487254cda24e89').then((res) => {
      dispatch(setAllFollowUser(res.data.relationship))
    })
  }
}

export function getDeleteFollowUser(current_user, user_id) {
  return dispatch => {
    return axios.get('/relationships/d1aa8c40be9bc551ae27/' +current_user+ '/unfollow/' +user_id+ '/7038923f4a237d5930eb').then((res) => {
      dispatch(setDeleteFollowUser(res.data.relationship[0]))
    })
  }
}

export function setFollowingUser(current_user, user_id) {
  return dispatch => {
    return axios.post('/relationships/a895dbc9751a9c322db2/' +current_user+ '/btp/' +user_id+ '/ffe498101aee44af7603')
  }
}

export function getDeleteFollowingUser(current_user, user_id) {
  return dispatch => {
    return axios.get('/relationships/c473b147ccb4efc43b32/' +current_user+ '/basukitjahyapurnama/' +user_id+ '/75636a7177a8198ed28d')
  }
}
