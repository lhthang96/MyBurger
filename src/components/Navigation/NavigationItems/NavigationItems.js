import React from 'react';

import classes from './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  if (props.version === 'desktop') {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem 
          link='/'
          version='desktop'
          active
        >Burger Builder</NavigationItem>
        <NavigationItem 
          link='/'
          version='desktop'
        >Checkout</NavigationItem>
        <NavigationItem 
          link='/'
          version='desktop'
        >Feedback</NavigationItem>
        <NavigationItem 
          link='/'
          version='desktop'
        >Contact</NavigationItem>
      </ul>
    );
  }
  return (
    <ul className={classes.NavigationItemsMobile}>
      <NavigationItem 
        link='/'
        version='mobile'
        active
      >Burger Builder</NavigationItem>
      <NavigationItem 
        link='/'
        version='mobile'
      >Checkout</NavigationItem>
      <NavigationItem 
        link='/'
        version='mobile'
      >Feedback</NavigationItem>
      <NavigationItem 
        link='/'
        version='mobile'
      >Contact</NavigationItem>
    </ul>
  )
}

export default navigationItems;