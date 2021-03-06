import * as actionTypes from '../actions/actionTypes';

import {updatedObject} from '../utility';

const errorMessageTranslator = (errorCode) => {
  switch (errorCode) {
    case 'EMAIL_EXISTS': return 'This email is already in use';
    case 'EMAIL_NOT_FOUND': return "This email doesn't exist";
    case 'INVALID_PASSWORD': return 'Password is incorrect';
    default: return 'Invalid email or password'
  }
}

const initState = {
  userId: null,
  token: null,
  error: null,
  loading: false,
  signupSuccess: false
}

const errorReset = (state, action) => {
  return updatedObject(state, {error: null})
}

const signupStart = (state, action) => {
  return updatedObject(state, {
    error: null,
    loading: true
  });
}

const signupSuccess = (state, action) => {
  return updatedObject(state, {
    error: null,
    loading: false,
    signupSuccess: true
  });
}

const signupFail = (state, action) => {
  return updatedObject(state, {
    error: errorMessageTranslator(action.error.message),
    loading: false,
    signupSuccess: false
  })
}

const signupError = (state, action) => {
  return updatedObject(state, {
    error: errorMessageTranslator(action.error.message),
    loading: false
  })
}

const signupReset = (state, action) => {
  return updatedObject(state, {
    signupSuccess: false
  })
}

const signinStart = (state, action) => {
  return updatedObject(state, {error: null, loading: true});
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
    error: errorMessageTranslator(action.error.message),
    loading: false
  })
}

const signinError = (state, action) => {
  return updatedObject(state, {
    error: errorMessageTranslator(action.error.message),
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
    case actionTypes.SIGN_UP_RESET: return signupReset(state, action);

    // Sign In cases
    case actionTypes.SIGN_IN_START: return signinStart(state, action);
    case actionTypes.SIGN_IN_SUCCESS: return signinSuccess(state, action);
    case actionTypes.SIGN_IN_FAIL: return signinFail(state, action);
    case actionTypes.SIGN_IN_ERROR: return signinError(state, action);
    case actionTypes.LOGOUT: return logout(state,action);

    case actionTypes.AUTH_ERROR_RESET: return errorReset(state, action);

    default:  return state
  }
}