import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS
  }
}

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL
  }
}

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error
  }
}

export const authSend = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };
    axios.post('/signin', authData)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch(authSuccess())
        } else {
          dispatch(authFail());
        }
      })
      .catch(err => {
        dispatch(authError(err));
      })
  }
}