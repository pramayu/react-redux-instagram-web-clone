import axios from 'axios';
import { browserHistory } from 'react-router';


function handleResponese(response){
  if(response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


export function setUserSignup(data) {
  return dispatch => {
    return fetch('/signup/f912ac38ddd196f4f6a1db0634394ff10915f0d38d3f3d5e72ec42ea6cc31828/signup', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(handleResponese).then(browserHistory.push('/signup/success'))
  }
}

export function checkUserExist(identifier) {
  return dispatch => {
    return axios.get(`/signup/check/${identifier}`)
  }
}
