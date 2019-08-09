import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility'

const initState = {
  loadingPage: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PAGE_LOADING : return updatedObject(state, {loadingPage: true});
    case actionTypes.PAGE_LOADED : return updatedObject(state, {loadingPage: false});

    default: return state;
  }
}