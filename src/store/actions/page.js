import * as actionTypes from './actionTypes';

export const pageLoading = () => {
  return {
    type: actionTypes.PAGE_LOADING
  }
};

export const pageLoaded = () => {
  return {
    type: actionTypes.PAGE_LOADED
  }
}