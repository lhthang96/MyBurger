import React, {Component} from 'react';
import classes from './Layout.css';

import Auxiliary from '../../hoc/Auxiliary';

import SideDrawer from '../UI/SideDrawer/SideDrawer';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

import Toolbar from '../Navigation/Toolbar/Toolbar';

export default class extends Component {

  state = {
    showSideMenu: false
  }

  openSideMenuHandler = () => {
    this.setState({showSideMenu: true});
  }

  closeSideMenuHandler = () => {
    this.setState({showSideMenu: false});
  }

  render() {
    return (
      <Auxiliary>
        <SideDrawer
          isShow={this.state.showSideMenu}
          openSideMenuHandler={this.openSideMenuHandler}
          closeSideMenuHandler={this.closeSideMenuHandler} >
          <div className={classes.SideMenuBox}>
            <div className={classes.LogoBox}>
              <Logo brandColor='white' />
            </div>
            <NavigationItems version='mobile' />
          </div>
        </SideDrawer>
        <Toolbar openSideMenuHandler={this.openSideMenuHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}