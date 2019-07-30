import React from 'react';

import classes from './SideDrawer.css';

import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = (props) => {
  let SideDrawerClass = [classes.SideDrawer, props.isShow ? classes.OpenDrawer : classes.CloseDrawer].join(' ');
  return(
    <div className={classes.MobileOnly}>
      <Backdrop
        show={props.isShow}
        clicked={props.closeSideMenuHandler} />
      <div className={SideDrawerClass}>
        {props.children}
      </div>
    </div>
  )
}

export default sideDrawer;