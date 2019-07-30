import React from 'react';

import classes from './SideDrawer.css';

import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = (props) => {
  return(
    <div className={classes.MobileOnly}>
      <Backdrop show/>
      <div className={classes.SideDrawer}>
        {props.children}
      </div>
    </div>
  )
}

export default sideDrawer;