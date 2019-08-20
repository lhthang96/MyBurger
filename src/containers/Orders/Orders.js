import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import classes from './Orders.css';

import Spinner from '../../components/UI/Spinner/Spinner';

export default () => {

  const ordersList        = useSelector( state => state.order.ordersList);
  const loading           = useSelector( state => state.order.loading);
  const error             = useSelector( state => state.order.error);
  const errorMessage      = useSelector( state => state.order.errorMessage);
  const isAuthenticated   = useSelector( state => state.auth.token !== null);

  const showOrdersList = () => {
    if (error) {
      return (
        <div className={classes.ErrorBox}>
          <i className="fas fa-exclamation-triangle fa-4x"></i>
          <p>{errorMessage.message}</p>
        </div>
      )
    }

    const itemColorClass = (status) => {
      if (status === 'Order received') return classes.DangerItem;
      if (status === 'Shipping') return classes.PrimaryItem;
      if (status === 'Canceled') return classes.ErrorItem;
      return classes.SuccessItem;
    }

    const ingredientsList = (list) => {
      let ingredients = [];
      for (let key in list) {
        ingredients.push({
          name: key,
          amount: list[key]
        }) 
      };
      
      const ingredientsList = ingredients.map(item => {
        if (item.amount > 0) {
          return <span key={item.name}>{item.name} ({item.amount})</span>
        } else return null;
      });
      return(ingredientsList);
    }

    if (ordersList.length > 0) {
      const list = ordersList.map(item => {
        return (
          <div className={classes.OrderItem} key={item.id}>
            <div className={[classes.OrderItemContent, itemColorClass(item.orderData.status)].join(' ')}>
              <p className={classes.IngredientsText}><strong>Ingredients: </strong>{ingredientsList(item.orderData.ingredients)}</p>
              <p><strong>Total Price: </strong>{item.orderData.totalPrice.toFixed(2)} $</p>
              <p><strong>Status: </strong>{item.orderData.status}</p>
            </div>
          </div>
        )
      });
      return list;
    } return (
      <div className={classes.noOrderMessageBox}>
        <p className={classes.noOrdersMessage}>You don't have any orders.</p>
        <p><span><Link to='/burger-builder' className={classes.SuccessText}>Build a burger</Link></span> to order now?</p>
      </div>
    ) ;
  }

  return isAuthenticated
    ? (
      <div className={classes.OrdersBox}>
        <h3 className={ordersList.length > 0 ? null : classes.displayNone}>Your orders:</h3>
        <div className={classes.SpinnerBox}>
          <Spinner isShow={loading} />
        </div>
        {loading ? null : showOrdersList()}
      </div>
    )
  : (
    <div className={classes.OrdersBox}>
      <div className={classes.NotAuthMessageBox}>
        <p>You have to <span><Link to='/signin' className={classes.SuccessText}>Sign in</Link></span> to see your orders...</p>
      </div>
    </div>
  )
}