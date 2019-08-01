import React from 'react';

import classes from './TopNav.css';

import TopNavItem from './TopNavItem/TopNavItem';

const topNav = (props) => (
  <ul className={classes.TopNav}>
    <TopNavItem 
      link='/'
      version='desktop'
    >Burger Builder</TopNavItem>
    <TopNavItem 
      link='/checkout'
      version='desktop'
    >Checkout</TopNavItem>
    <TopNavItem 
      link='/feedback'
      version='desktop'
    >Feedback</TopNavItem>
    <TopNavItem 
      link='/contact'
      version='desktop'
    >Contact</TopNavItem>
  </ul>
)

export default topNav;