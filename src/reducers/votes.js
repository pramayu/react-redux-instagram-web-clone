import { SET_NEW_VOTE, SET_ALL_VOTE, SET_DELETE_VOTE, SET_FIND_VOTES } from '../actions/votes';


const initialState = {
  votes: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_VOTE:
      return action.votes
    case SET_NEW_VOTE:
      return [
        ...state,
        action.vote
      ]
    case SET_DELETE_VOTE:
      return state.filter(vote => vote._id !== action.voteId)
    case SET_FIND_VOTES:
      return action.votes
    default:
      return state;
  }
}
