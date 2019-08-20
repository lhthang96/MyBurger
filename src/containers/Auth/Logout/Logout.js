import React, {useEffect, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../../../store/actions/index';

export default () => {

  const building = useSelector(state => state.burgerBuilder.building);

  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(actions.logout()),[dispatch]);
  const resetOrdersList = useCallback(() => dispatch(actions.resetOrdersList()),[dispatch]);

  useEffect(() => {
    logout();
    resetOrdersList();
  }, [logout, resetOrdersList]);

  return (
    building ? <Redirect to='/burger-builder/checkout' /> : <Redirect to='/' />
  )
}