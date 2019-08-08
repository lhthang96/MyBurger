import React from 'react';

import classes from './SideNav.css';

import SideNavItem from './SideNavItem/SideNavItem';

const sideNav = (props) => (
  <ul className={classes.SideNav}>
    <SideNavItem 
      link='/burger-builder'
      clicked={props.closeSideMenuHandler}
      noExact
    >Burger Builder</SideNavItem>
    <SideNavItem 
      link='/orders'
      clicked={props.closeSideMenuHandler}
    >Orders</SideNavItem>
    <SideNavItem 
      link='/feedback'
      clicked={props.closeSideMenuHandler}
    >Feedback</SideNavItem>
    <SideNavItem 
      link='/contact'
      clicked={props.closeSideMenuHandler}
    >Contact</SideNavItem>
    <SideNavItem 
      link='/signin'
      clicked={props.closeSideMenuHandler}
    >Sign In</SideNavItem>
    <SideNavItem 
      link='/signup'
      clicked={props.closeSideMenuHandler}
    >Sign Up</SideNavItem>
    <div className={classes.CloseSideNav} onClick={props.closeSideMenuHandler}>
      <i className="fas fa-reply"></i>
      <span>Close</span>
    </div>
  </ul>
)

export default sideNav;