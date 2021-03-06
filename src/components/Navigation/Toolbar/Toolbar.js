import React from 'react';
import classes from './Toolbar.css';

import TopNav from '../NavigationItems/TopNav/TopNav';
import UserItems from '../NavigationItems/TopNav/UserItems/UserItems';

import Logo from '../../Logo/Logo';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={[classes.MenuIcon, classes.MobileOnly].join(' ')} onClick={props.openSideMenuHandler}><i className="fas fa-bars fa-2x"></i></div>
      <Logo brandColor='white' />
      <nav className={classes.DesktopOnly}>
        <TopNav isAuthenticated={props.isAuthenticated} />
      </nav>
      <UserItems isAuthenticated={props.isAuthenticated} />
    </header>
  )
}

export default toolbar;