import React from 'react';
import classes from './Toolbar.css';

import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../Logo/Logo';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={[classes.MenuIcon, classes.MobileOnly].join(' ')} onClick={props.openSideMenuHandler}><i className="fa fa-bars fa-2x"></i></div>
      <Logo brandColor='white' />
      <nav className={classes.DesktopOnly}>
        <NavigationItems version='desktop' />
      </nav>
    </header>
  )
}

export default toolbar;