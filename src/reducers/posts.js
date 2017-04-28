import { SET_USER_POST, ADD_POST, UPDATE_USER_POST, SET_REMOVE_POST, SET_POST_BY_RELATION } from '../actions/user-page';


let initialState = {
  posts: []
}


export default (state = initialState, action={}) => {
  switch (action.type) {
    case SET_USER_POST:
      return  action.posts
    case ADD_POST:
      return [
        ...state,
        Object.assign({}, action.post)
      ]
    case UPDATE_USER_POST:
      return state.map(item => {
        if(item._id === action.post._id) return action.post;
        return item;
      })
    case SET_REMOVE_POST:
      return state.filter(item => item._id !== action.postId)
    case SET_POST_BY_RELATION:
      return action.posts
    default:
      return state;
  }
}
