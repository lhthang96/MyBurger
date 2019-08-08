import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Feedback from './containers/Feedback/Feedback';
import HomePage from './components/Pages/HomePage/HomePage';
import ContactPage from './components/Pages/ContactPage/ContactPage';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
import Logout from './containers/Auth/Logout/Logout';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path='/' exact component={HomePage} />
            <Route path='/burger-builder' exact component={BurgerBuilder} />
            <Route path='/burger-builder/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/feedback' component={Feedback} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/logout' component={Logout} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}