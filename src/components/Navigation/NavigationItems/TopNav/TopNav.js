import React from 'react';

import classes from './TopNav.css';

import TopNavItem from './TopNavItem/TopNavItem';

const topNav = (props) => (
  <ul className={classes.TopNav}>
    <TopNavItem 
      link='/'
    >Burger Builder</TopNavItem>
    <TopNavItem 
      link='/orders'
    >Orders</TopNavItem>
    <TopNavItem 
      link='/feedback'
    >Feedback</TopNavItem>
    <TopNavItem 
      link='/contact'
    >Contact</TopNavItem>
  </ul>
)

export default topNav;