import React, {Component} from 'react';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from '../OrderForm/OrderForm';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }


  render() {
    return(
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.state.ingredients} />
          
        <OrderForm
          ingredients={this.state.ingredients} />
      </div>
    )
  }
}

export default Checkout;