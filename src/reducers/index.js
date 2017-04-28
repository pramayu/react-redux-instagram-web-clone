import { combineReducers } from 'redux';
import current_user from './current-user';
import user_info from './users';
import posts from './posts';
import comments from './comment'
import votes from './votes';
import followers from './relationships';
import search from './search';
import notifications from './notifications';

export default combineReducers ({
  user_info,
  current_user,
  posts,
  comments,
  votes,
  followers,
  search,
  notifications
});
