import _ from 'lodash';
import { SET_SEARCH_USER } from '../actions/search';


const initialState = {
  users: []
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case SET_SEARCH_USER:
      if(!_.isEmpty(action.users)) {
        return action.users
      } else {
        return initialState;
      }
    default:
      return state;
  }
}
