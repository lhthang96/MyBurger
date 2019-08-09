import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './AuthOrderForm.css';

import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';

import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class AuthOrderForm extends Component {

  state = {
    isShowOrderSummary: false,
    isCancel: false
  }

  onCancelCheckoutHandler = () => {
    this.setState({isCancel: true})
  }

  openOrderSummary = () => {
    this.setState({isShowOrderSummary: true});
  }

  closeOrderSummary = () => {
    this.setState({isShowOrderSummary: false});
  }

  sendOrderHandler = () => {
    const orderData = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
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
      userId: this.props.userId ? this.props.userId : 'Anonymous'
    };

    this.props.sendOrder(updatedOrderData);
  }

  render() {

    const isRedirect = this.state.isCancel ? <Redirect to='/burger-builder' /> : null;
    const modalContent = this.props.loading ? (
        <Spinner isShow={this.props.loading} />
    ) : (
      <OrderSummary
        ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        closeModal={this.closeOrderSummary}
        sendOrder={this.sendOrderHandler} />
    )

    return(
      <div className={classes.AuthOrderForm}>
        {isRedirect}
        <Modal isShow={this.state.isShowOrderSummary} closeModal={this.closeOrderSummary}>
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
          <Button btnType='Danger' clicked={this.onCancelCheckoutHandler}>Cancel</Button>
          <Button btnType='Success' clicked={this.openOrderSummary}>Order</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.sendLoading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendOrder: (orderData) => dispatch(actions.sendOrder(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthOrderForm);