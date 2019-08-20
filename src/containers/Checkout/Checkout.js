import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from './OrderForm/OrderForm';
import AuthOrderForm from './AuthOrderForm/AuthOrderForm';
import DoneOrder from './DoneOrder/DoneOrder';

export default (props) => {
  const ingredients       = useSelector( state => state.burgerBuilder.ingredients );
  const totalPrice        = useSelector( state => state.burgerBuilder.totalPrice );
  const isAuthenticated   = useSelector( state => state.auth.token !== null );
  const building          = useSelector( state => state.burgerBuilder.building );
  const doneBuilt         = useSelector( state => state.burgerBuilder.doneBuilt );

  let content = <DoneOrder isAuthenticated={isAuthenticated} />;


  window.scrollTo(0,0);

  const orderForm = isAuthenticated ?
    <AuthOrderForm ingredients={ingredients} totalPrice={totalPrice} /> :
    <OrderForm ingredients={ingredients} totalPrice={totalPrice} />

  const CheckoutSection = (
    <div className={classes.CheckoutBox}>
      <CheckoutSummary
        ingredients={ingredients}
        totalPrice={totalPrice} />
        
      <div className={classes.CheckoutFormBox}>
        {orderForm}
      </div>
    </div>
  );

  if (!building && !doneBuilt) {
    content = <Redirect to='/burger-builder' />
  }

  if (building && !doneBuilt) {
    content = CheckoutSection;
  }

  return content;
}