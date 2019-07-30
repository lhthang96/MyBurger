import React from 'react';

import classes from './SideNav.css';

import SideNavItem from './SideNavItem/SideNavItem';

const sideNav = (props) => (
  <ul className={classes.SideNav}>
    <SideNavItem 
      link='/'
      active
    >Burger Builder</SideNavItem>
    <SideNavItem 
      link='/'
    >Checkout</SideNavItem>
    <SideNavItem 
      link='/'
    >Feedback</SideNavItem>
    <SideNavItem 
      link='/'
    >Contact</SideNavItem>
    <div className={classes.CloseSideNav} onClick={props.closeSideMenuHandler}>
      <i className="fas fa-reply"></i>
      <span>Close</span>
    </div>
  </ul>
)

export default sideNav;