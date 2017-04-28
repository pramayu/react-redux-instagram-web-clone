import { SET_NEW_NOTIFICATION, SET_ALL_NOTIFICATION } from '../actions/notifications';
import { SET_NOTIF } from '../actions/comments';

let initialState = {
  notifications: []
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case SET_ALL_NOTIFICATION:
      return Object.assign([], action.notifications)
    case SET_NEW_NOTIFICATION:
      return [
        ...state,
        Object.assign({}, action.notification)
      ]
      case SET_NOTIF:
        return [
          ...state,
          Object.assign({}, action.notification)
        ]
    default:
      return state;
  }
}
