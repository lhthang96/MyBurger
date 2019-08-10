import React from 'react';

import classes from './UserItems.css';

import Auxiliary from '../../../../../hoc/Auxiliary/Auxiliary';
import UserItem from './UserItem/UserItem';

export default (props) => (
  <ul className={classes.UserItems}>
    {
      !props.isAuthenticated ?
      <Auxiliary>
        <UserItem link='/signin' type='success' >Sign in</UserItem>
        <UserItem link='/signup' type='danger' >Sign up</UserItem>
      </Auxiliary> :
      <UserItem link='/logout' type='danger'>Log out</UserItem>
    }
  </ul>
)