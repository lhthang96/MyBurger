import React from 'react';

import classes from './SideNav.css';

import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
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

    {/* ##################### USER NAV LINK ###################### */}
    { props.isAuthenticated 
    ? <SideNavItem link='/logout' clicked={props.closeSideMenuHandler}>Log out</SideNavItem>
    : <Auxiliary>
        <SideNavItem 
          link='/signin'
          clicked={props.closeSideMenuHandler}
          isMobileOnly
        >Sign In</SideNavItem>
        <SideNavItem 
          link='/signup'
          clicked={props.closeSideMenuHandler}
          isMobileOnly
        >Sign Up</SideNavItem>
      </Auxiliary>} 

    <div className={classes.CloseSideNav} onClick={props.closeSideMenuHandler}>
      <i className="fas fa-reply"></i>
      <span>Close</span>
    </div>
  </ul>
)

export default sideNav;