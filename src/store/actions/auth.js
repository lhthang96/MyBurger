import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const signinStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  }
}

export const signinSuccess = () => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS
  }
}

export const signinFail = () => {
  return {
    type: actionTypes.SIGN_IN_FAIL
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
      password: password
    };
    axios.post('/signin', signinData)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch(signinSuccess())
        } else {
          dispatch(signinFail());
        }
      })
      .catch(err => {
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

export const signupFail = () => {
  return {
    type: actionTypes.SIGN_UP_FAIL
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
      password: password
    };
    axios.post('/signup', signupData)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch(signupSuccess())
        } else {
          dispatch(signupFail());
        }
      })
      .catch(err => {
        dispatch(signupError(err));
      })
  }
}