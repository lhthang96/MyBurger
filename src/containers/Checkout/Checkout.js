import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from '../OrderForm/OrderForm';

class Checkout extends Component {

  render() {
    const CheckoutSection = this.props.storeTotalPrice > 4 ? (
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
          
        <OrderForm
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
      </div>
    ) :
    (
      <div className={classes.CheckoutBox}>
        <p>Your order was send to us...</p><br />
        <p> Lets check the <span><Link to='/orders'>Orders list</Link></span> or <span><Link to='/burger-builder'>build</Link></span> another burger.</p>
      </div>
    )

    return CheckoutSection;
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.ingredients,
    storeTotalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);