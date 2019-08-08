import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const signinStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  }
}

export const signinSuccess = (userId, token) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    userId: userId,
    token: token
  }
}

export const signinFail = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error
  }
}

export const signinError = (error) => {
  return {
    type: actionTypes.SIGN_IN_ERROR,
    error: error
  }
}

export const signinSend = (email, password) => {
  return dispatch => {
    dispatch(signinStart());
    const signinData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY3e98rH3pA4xYbAwYCPF3BQJsdoyn_GU', signinData)
      .then(res => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          dispatch(signinSuccess(res.data.localId, res.data.idToken))
        } else {
          dispatch(signinFail(res.data.error));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(signinError(err));
      })
  }
}

export const signupStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  }
}

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS
  }
}

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    error: error
  }
}

export const signupError = (error) => {
  return {
    type: actionTypes.SIGN_UP_ERROR,
    error: error
  }
}

export const signupSend = (email, password) => {
  return dispatch => {
    dispatch(signupStart());
    const signupData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY3e98rH3pA4xYbAwYCPF3BQJsdoyn_GU', signupData)
      .then(res => {
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          dispatch(signupSuccess())
        } else {
          dispatch(signupFail());
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(signupError(err));
      })
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}