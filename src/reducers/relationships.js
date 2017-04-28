import { SET_FOLLOW_USER, SET_ALL_FOLLOW_USER, SET_DELETE_FOLLOWER } from '../actions/relationships';

const initialState = {
  followers: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_FOLLOW_USER:
      return action.follow
    case SET_FOLLOW_USER:
      return action.follow
    case SET_DELETE_FOLLOWER:
      return action.follower
    default:
      return state;
  }
}
