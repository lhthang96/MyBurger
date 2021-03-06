import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import LazyComponent from './hoc/LazyComponent/LazyComponent';

import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage/HomePage';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';

const LazyOrders = LazyComponent(() => {
  return import('./containers/Orders/Orders');
});

const LazyFeedback = LazyComponent(() => {
  return import('./containers/Feedback/Feedback');
});

const LazyContact = LazyComponent(() => {
  return import('./components/Pages/ContactPage/ContactPage');
});

const LazySignIn = LazyComponent(() => {
  return import('./containers/Auth/SignIn/SignIn');
});

const LazySignUp = LazyComponent(() => {
  return import('./containers/Auth/SignUp/SignUp');
});

class App extends Component {
  componentDidMount() {
    this.props.authCheckInit();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path='/' exact component={HomePage} />
            <Route path='/burger-builder' exact component={BurgerBuilder} />
            <Route path='/burger-builder/checkout' component={Checkout} />
            <Route path='/orders' component={LazyOrders} />
            <Route path='/feedback' component={LazyFeedback} />
            <Route path='/contact' component={LazyContact} />
            <Route path='/signin' component={LazySignIn} />
            <Route path='/signup' component={LazySignUp} />
            <Route path='/logout' component={Logout} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckInit: () => dispatch(actions.authCheckInit())
  }
}

export default connect(null, mapDispatchToProps)(App);