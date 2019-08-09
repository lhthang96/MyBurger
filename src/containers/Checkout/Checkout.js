import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from './OrderForm/OrderForm';
import AuthOrderForm from './AuthOrderForm/AuthOrderForm';

class Checkout extends Component {

  render() {
    window.scrollTo(0,0);

    const orderForm = this.props.isAuthenticated ?
      <AuthOrderForm ingredients={this.props.storeIngredients} totalPrice={this.props.storeTotalPrice} /> :
      <OrderForm ingredients={this.props.storeIngredients} totalPrice={this.props.storeTotalPrice} />

    const CheckoutSection = this.props.storeTotalPrice > 4 ? (
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
          
        {orderForm}
      </div>
    ) :
    (
      <div className={classes.NotifBox}>
        <p className={classes.deliText}>Your order was send to us. We will deliver to you as soon as possible.<span><i className="fas fa-shipping-fast fa-2x"></i></span></p>
        <p> Lets check the <span><Link to='/orders' className={classes.SuccessText}>Orders list</Link></span> or <span><Link to='/burger-builder' className={classes.SuccessText}>Build</Link></span> another burger.</p>
      </div>
    )

    return CheckoutSection;
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.burgerBuilder.ingredients,
    storeTotalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Checkout);