import { SET_NEW_COMMENT, SET_COMMENT_BY_POST, SET_UPDATE_COMMENT, SET_DELETE_COMMENT } from '../actions/comments';

const initialState = {
  comments: []
}

export default (state = initialState, action={}) => {
  switch (action.type) {
    case SET_COMMENT_BY_POST:
      return action.comments
    case SET_NEW_COMMENT:
      return [
        ...state,
        Object.assign({}, action.comment)
      ]
    case SET_UPDATE_COMMENT:
    return state.map((item) => {
      if(item._id === action.comment._id) return action.comment
      return item;
    })
    case SET_DELETE_COMMENT:
      return state.filter(comment => comment._id !== action.commentId)
    default:
      return state;
  }
}
