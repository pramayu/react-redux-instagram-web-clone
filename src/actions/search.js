import axios from 'axios';

export const SET_SEARCH_USER = 'SET_SEARCH_USER';

export function setSearchUser(users) {
  return {
    type: SET_SEARCH_USER,
    users
  }
}

export function getSearchUser(term) {
  return dispatch => {
    return axios.get('/0bb64acdf3e53da335b2/8cfd4af5208036e1020b7b5691744507a86bfb38/search/' + term).then((res) => {
      dispatch(setSearchUser(res.data.users))
    })
  }
}
