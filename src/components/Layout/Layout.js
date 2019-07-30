import React, {Component} from 'react';
import classes from './Layout.css';

import Auxiliary from '../../hoc/Auxiliary';

import SideDrawer from '../UI/SideDrawer/SideDrawer';
import Logo from '../Logo/Logo';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';

import Toolbar from '../Navigation/Toolbar/Toolbar';

export default class extends Component {
  render() {
    return (
      <Auxiliary>
        <SideDrawer>
          <div className={classes.SideMenuBox}>
            <div className={classes.LogoBox}>
              <Logo brandColor='#703B09' />
            </div>
            <NavigationItem
              link='/'
              active
            >Burger builder</NavigationItem>
          </div>
        </SideDrawer>
        <Toolbar />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}