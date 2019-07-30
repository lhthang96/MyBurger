import React from 'react';

import classes from './NavigationItems.css'

import TopNav from './TopNav/TopNav';
import SideNav from './SideNav/SideNav';

const navigationItems = (props) => {
  if (props.version === 'desktop') {
    return <TopNav />
  }
  return <SideNav />
}

export default navigationItems;