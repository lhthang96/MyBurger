import * as actionTypes from '../actions/actionTypes';

import {updatedObject} from '../utility';

const initState = {
  userId: null,
  token: null,
  error: null,
  loading: false
}

const signupStart = (state, action) => {
  return updatedObject(state, {loading: true});
}

const signupSuccess = (state, action) => {
  return updatedObject(state, {
    error: null,
    loading: false
  });
}

const signupFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  })
}

const signupError = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  })
}

const signinStart = (state, action) => {
  return updatedObject(state, {loading: true});
}

const signinSuccess = (state, action) => {
  return updatedObject(state, {
    userId: action.userId,
    token: action.token,
    error: null,
    loading: false
  });
}

const signinFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  })
}

const signinError = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  })
}

const logout = (state, action) => {
  return updatedObject(state, {
    userId: null,
    token: null,
    loading: false
  })
}

export default (state = initState, action) => {
  switch (action.type) {
    // Sign In cases
    case actionTypes.SIGN_UP_START: return signupStart(state, action);
    case actionTypes.SIGN_UP_SUCCESS: return signupSuccess(state, action);
    case actionTypes.SIGN_UP_FAIL: return signupFail(state, action);
    case actionTypes.SIGN_UP_ERROR: return signupError(state, action);

    // Sign In cases
    case actionTypes.SIGN_IN_START: return signinStart(state, action);
    case actionTypes.SIGN_IN_SUCCESS: return signinSuccess(state, action);
    case actionTypes.SIGN_IN_FAIL: return signinFail(state, action);
    case actionTypes.SIGN_IN_ERROR: return signinError(state, action);
    case actionTypes.LOGOUT: return logout(state,action);

    default:  return state
  }
}