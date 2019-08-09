import * as actionTypes from './actionTypes';
import * as actions from '../actions/index';
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
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem('Token', res.data.idToken);
          localStorage.setItem('UserId', res.data.localId);
          localStorage.setItem('ExpirationDate', new Date(new Date().getTime() + res.data.expiresIn*1000));
          dispatch(signinSuccess(res.data.localId, res.data.idToken));
          dispatch(actions.fetchOrdersList(res.data.localId));
          dispatch(autoLogout(res.data.expiresIn));
        } else {
          dispatch(signinFail(res.data.error));
        }
      })
      .catch(err => {
        dispatch(signinError(err.response.data.error));
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
        if (res.status === 200 || res.status === 201) {
          dispatch(signupSuccess())
        } else {
          dispatch(signupFail());
        }
      })
      .catch(err => {
        dispatch(signupError(err.response.data.error));
      })
  }
}

export const logout = () => {
  localStorage.removeItem('Token');
  localStorage.removeItem('UserId');
  localStorage.removeItem('ExpirationDate');
  return {
    type: actionTypes.LOGOUT
  }
}

export const autoLogout = (expiresTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    },expiresTime*1000)
  }
}

export const authCheckInit = () => {
  return dispatch => {
    const token = localStorage.getItem('Token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem('ExpirationDate');
      if (new Date(expirationDate).getTime() <= new Date().getTime()) {
        dispatch(logout());
      } else {
        dispatch(signinSuccess(localStorage.getItem('UserId'), token));
        dispatch(autoLogout((new Date(expirationDate).getTime() - new Date().getTime())/1000));
        dispatch(actions.fetchOrdersList(localStorage.getItem('UserId')));
      }
    }
  }
}