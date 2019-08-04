import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Layout.css';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import SideDrawer from '../UI/SideDrawer/SideDrawer';
import Logo from '../Logo/Logo';
import SideNav from '../Navigation/NavigationItems/SideNav/SideNav';

import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {

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
    console.log(this.props);
    return (
      <Auxiliary>
        <SideDrawer
          isShow={this.state.showSideMenu}
          openSideMenuHandler={this.openSideMenuHandler}
          closeSideMenuHandler={this.closeSideMenuHandler}
        >
          <div className={classes.SideMenuBox}>
            <div className={classes.LogoBox}>
              <Logo brandColor='white'/>
            </div>
            <SideNav closeSideMenuHandler={this.closeSideMenuHandler}/>
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

export default withRouter(Layout);