import React from 'react';

import classes from './NavigationItem.css'

const navigationItem = (props) => {
  if (props.version === 'desktop') {
    return (
      <li className={classes.NavigationItem}><a
        href={props.link}
        className={props.active ? classes.active : null}
      >{props.children}</a></li>
    );
  }
  return (
    <li className={classes.NavigationItemMobile}><a
      href={props.link}
      className={props.active ? classes.active : null}
    >{props.children}</a></li>
  );
}

export default navigationItem;