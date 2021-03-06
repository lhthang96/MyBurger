import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Layout.css';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import SideDrawer from '../UI/SideDrawer/SideDrawer';
import Logo from '../Logo/Logo';
import SideNav from '../Navigation/NavigationItems/SideNav/SideNav';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Footer from '../Pages/Footer/Footer';

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
    return (
      <Auxiliary>
        <SideDrawer
          isShow={this.state.showSideMenu}
          openSideMenuHandler={this.openSideMenuHandler}
          closeSideMenuHandler={this.closeSideMenuHandler}
        >
          <div className={classes.SideMenuBox}>
            <div className={classes.LogoBox}>
              <Logo brandColor='white' closeSideMenuHandler={this.closeSideMenuHandler} />
            </div>
            <SideNav isAuthenticated={this.props.isAuthenticated} closeSideMenuHandler={this.closeSideMenuHandler}/>
          </div>
        </SideDrawer>
        <Toolbar openSideMenuHandler={this.openSideMenuHandler} isAuthenticated={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
        
        <Footer />
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(Layout));