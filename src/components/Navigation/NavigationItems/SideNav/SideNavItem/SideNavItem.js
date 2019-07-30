import React from 'react';

import classes from './SideNavItem.css';

const sideNavItem = (props) => (
  <li className={classes.SideNavItem}><a
    href={props.link}
    className={props.active ? classes.active : null}
  >{props.children}</a></li>
)

export default sideNavItem;