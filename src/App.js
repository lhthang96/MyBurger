import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Feedback from './containers/Feedback/Feedback';
import Contact from './components/Contact/Contact';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/feedback' component={Feedback} />
            <Route path='/contact' component={Contact} />
            {/* <BurgerBuilder />
            <Checkout /> */}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}