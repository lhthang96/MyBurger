import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

export default class extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            {/* <BurgerBuilder />
            <Checkout /> */}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}