import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './AuthOrderForm.css';

import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';

import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

export default (props) => {
  const [isShowOrderSummary, setIsShowOrderSummary] = useState(false);
  const [isCancelCheckout, setIsCancelCheckout] = useState(false);

  const loading = useSelector(state => state.order.sendLoading);
  const userId = useSelector(state => state.auth.userId);

  const dispatchRedux = useDispatch();
  const sendOrder = (orderData) => dispatchRedux(actions.sendOrder(orderData));

  const onCancelCheckoutHandler = () => {
    setIsCancelCheckout(true);
  }

  const openOrderSummary = () => {
    setIsShowOrderSummary(true);
  }

  const closeOrderSummary = () => {
    setIsShowOrderSummary(false);
  }

  const sendOrderHandler = () => {
    const orderData = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      customer: {
        address: '14 Test street, Testing City',
        name: 'Admin',
        phone: '(+84) 359 532 535',
        deliMethod: 'Standard'
      },
      status: 'Order received'
    }

    const updatedOrderData = {
      ...orderData,
      userId: userId ? userId : 'Anonymous'
    };

    sendOrder(updatedOrderData);
  }

  const isRedirect = isCancelCheckout ? <Redirect to='/burger-builder' /> : null;
  const modalContent = loading ? (
      <Spinner isShow={loading} />
  ) : (
    <OrderSummary
      ingredients={props.ingredients}
      totalPrice={props.totalPrice}
      closeModal={closeOrderSummary}
      sendOrder={sendOrderHandler} />
  )

  return(
    <div className={classes.AuthOrderForm}>
      {isRedirect}
      <Modal isShow={isShowOrderSummary} closeModal={closeOrderSummary}>
        {modalContent}
      </Modal>
      <div className={classes.AuthOrderInfoBox}>
        <p>Hi <strong>Admin</strong>, thanks for using our service.</p>
        <div className={classes.AuthOrderInfoCard}>
          <h4>Your contact info:</h4>
          <p><strong>Phone: </strong>(+84) 359 532 535</p>
          <p><strong>Address: </strong>14 Test street, Testing City.</p>
        </div>
      </div>

      <div className={classes.ButtonBox}>
        <Button btnType='Danger' clicked={onCancelCheckoutHandler}>Cancel</Button>
        <Button btnType='Success' clicked={openOrderSummary}>Order</Button>
      </div>
    </div>
  )
}