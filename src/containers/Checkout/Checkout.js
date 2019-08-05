import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from '../OrderForm/OrderForm';

class Checkout extends Component {

  render() {
    return(
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
          
        <OrderForm
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.ingredients,
    storeTotalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);