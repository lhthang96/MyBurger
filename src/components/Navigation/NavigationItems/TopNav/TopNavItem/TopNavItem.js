import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './TopNavItem.css';

const topNavItem = (props) => (
  <li className={classes.TopNavItem}><NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.noExact ? false : true}
    >{props.children}</NavLink>
  </li>
)

export default topNavItem;