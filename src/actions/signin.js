import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import setAuthorization from '../shared/authorization-token';


export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function setUserLogout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorization(false);
    dispatch(setCurrentUser({}));
    browserHistory.push('/signin')
  }
}

export function getUserSignin(data) {
  return dispatch => {
    return axios.post('/signin', data).then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorization(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      window.location = '/'
    })
  }
}

export function getUpdateToken(user_id) {
  return dispatch => {
    return axios.post('/user/refresh/' +user_id+ '/token').then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorization(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  }
}

export function getVerifyUser(tokene) {
  return dispatch => {
    return axios.post(`/verify/${tokene}`).then((res) => {
      if(res.data.token) {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorization(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        browserHistory.push('/');
      } else {
        browserHistory.push('/signin');
      }
    })
  }
}
