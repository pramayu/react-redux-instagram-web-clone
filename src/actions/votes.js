import axios from 'axios';

export const SET_NEW_VOTE = 'SET_NEW_VOTE';
export const SET_ALL_VOTE = 'SET_ALL_VOTE';
export const SET_DELETE_VOTE = 'SET_DELETE_VOTE';
export const SET_FIND_VOTES = 'SET_FIND_VOTES';

export function setNewVote(vote) {
  return {
    type: SET_NEW_VOTE,
    vote
  }
}

export function setAllVote(votes) {
  return {
    type: SET_ALL_VOTE,
    votes
  }
}

export function setDeleteVote(voteId) {
  return {
    type: SET_DELETE_VOTE,
    voteId
  }
}

export function setFindVotes(votes) {
  return {
    type: SET_FIND_VOTES,
    votes
  }
}

export function addNewVote(user_id, post_id) {
  return dispatch => {
    return axios.post('/comment/cb5c8314c54774/' + user_id + '/vote/' + post_id).then((res) => {
      dispatch(setNewVote(res.data.votex))
    })
  }
}

export function getAllVote() {
  return dispatch => {
    return axios.get('/comment/8e0960613c61fd2cba661c4f/votes').then((res) => {
      dispatch(setAllVote(res.data.votes))
    })
  }
}

export function getDeleteVote(post_id, user_id) {
  return dispatch => {
    return axios.get('/comment/943bc55bf13f599f543ebb13/' +post_id+ '/b028d44b751c25d998b71e65/' +user_id).then((res) => {
      dispatch(setDeleteVote(res.data.id))
    })
  }
}

export function findVotes() {
  return dispatch => {
    return axios.get('/posts/2b83f125092e0c6cb5eec0e51cee55c6963a9b51/2f7ea852b6367e10bd679e0ad7246cc49f0d582e').then((res) => {
      dispatch(setFindVotes(res.data.votes))
    })
  }
}
