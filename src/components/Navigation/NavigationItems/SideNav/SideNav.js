import React from 'react';

import classes from './SideNav.css';

import SideNavItem from './SideNavItem/SideNavItem';

const sideNav = (props) => (
  <ul className={classes.SideNav}>
    <SideNavItem 
      link='/'
      clicked={props.closeSideMenuHandler}
    >Burger Builder</SideNavItem>
    <SideNavItem 
      link='/checkout'
      clicked={props.closeSideMenuHandler}
    >Checkout</SideNavItem>
    <SideNavItem 
      link='/feedback'
      clicked={props.closeSideMenuHandler}
    >Feedback</SideNavItem>
    <SideNavItem 
      link='/contact'
      clicked={props.closeSideMenuHandler}
    >Contact</SideNavItem>
    <div className={classes.CloseSideNav} onClick={props.closeSideMenuHandler}>
      <i className="fas fa-reply"></i>
      <span>Close</span>
    </div>
  </ul>
)

export default sideNav;