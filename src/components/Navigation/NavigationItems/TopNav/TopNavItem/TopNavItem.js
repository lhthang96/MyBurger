import React from 'react';

import classes from './TopNavItem.css';

const topNavItem = (props) => (
  <li className={classes.TopNavItem}><a
    href={props.link}
    className={props.active ? classes.active : null}
  >{props.children}</a></li>
)

export default topNavItem;