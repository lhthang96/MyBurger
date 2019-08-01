import React, {Component} from 'react';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    },
    isSend: false,
    isCancel: false
  }

  sendOrderHandler = () => {
    this.setState({isSend: true});
  }

  cancelOrderHandler = () => {
    this.setState({isCancel: true});
  }

  render() {
    return(
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          sendOrderHandler={this.sendOrderHandler}
          cancelOrderHandler={this.cancelOrderHandler} />
      </div>
    )
  }
}