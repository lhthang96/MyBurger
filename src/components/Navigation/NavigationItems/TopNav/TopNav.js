import React from 'react';

import classes from './TopNav.css';

import TopNavItem from './TopNavItem/TopNavItem';

const topNav = (props) => (
  <ul className={classes.TopNav}>
    <TopNavItem 
      link='/'
      version='desktop'
      active
    >Burger Builder</TopNavItem>
    <TopNavItem 
      link='/'
      version='desktop'
    >Checkout</TopNavItem>
    <TopNavItem 
      link='/'
      version='desktop'
    >Feedback</TopNavItem>
    <TopNavItem 
      link='/'
      version='desktop'
    >Contact</TopNavItem>
  </ul>
)

export default topNav;