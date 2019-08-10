import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './SideNavItem.css';

const sideNavItem = (props) => {
  const mobileOnlyClass = props.isMobileOnly ? classes.MobileOnly : null;
  return (
    <li className={[classes.SideNavItem,mobileOnlyClass].join(' ')}><NavLink
      to={props.link}
      exact={props.noExact ? false : true}
      activeClassName={classes.active}
      onClick={props.clicked}
    >{props.children}</NavLink></li>
  )
} 

export default sideNavItem;