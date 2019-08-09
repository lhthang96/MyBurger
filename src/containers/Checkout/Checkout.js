import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from './OrderForm/OrderForm';
import AuthOrderForm from './AuthOrderForm/AuthOrderForm';
import DoneOrder from './DoneOrder/DoneOrder';

class Checkout extends Component {

  render() {
    window.scrollTo(0,0);

    const orderForm = this.props.isAuthenticated ?
      <AuthOrderForm ingredients={this.props.storeIngredients} totalPrice={this.props.storeTotalPrice} /> :
      <OrderForm ingredients={this.props.storeIngredients} totalPrice={this.props.storeTotalPrice} />

    const CheckoutSection = (
      <div className={classes.CheckoutBox}>
        <CheckoutSummary
          ingredients={this.props.storeIngredients}
          totalPrice={this.props.storeTotalPrice} />
          
        {orderForm}
      </div>
    );

    let content = <DoneOrder isAuthenticated={this.props.isAuthenticated} />;

    if (!this.props.building && !this.props.doneBuilt) {
      content = <Redirect to='/burger-builder' />
    }

    if (this.props.building && !this.props.doneBuilt) {
      content = CheckoutSection;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.burgerBuilder.ingredients,
    storeTotalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    doneBuilt: state.burgerBuilder.doneBuilt
  }
}

export default connect(mapStateToProps)(Checkout);