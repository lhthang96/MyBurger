import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios';  

import classes from './OrderForm.css';
import {formValidation} from '../../../store/utility'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import withNotifHandler from '../../../hoc/WithNotifHandler/WithNotifHandler';

import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

class OrderForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your name',
          type: 'text'
        },
        label: 'Name',
        value: '',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true
        }
      },
      address: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Delivery address',
          type: 'text'
        },
        value: '',
        label: 'Address',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true
        }
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your phone',
          type: 'text'
        },
        value: '',
        label: 'Phone',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true,
          isPhone: true
        }
      },
      deliMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'standard', displayText: 'Standard'},
            {value: 'fastest', displayText: 'Fastest'},
            {value: 'cheapest', displayText: 'Cheapest'}
          ]
        },
        value: 'standard',
        label: 'Delivery method',
        isTouched: false,
        shouldValidate: false,
        isValid: true,
        errorMessage: [],
        rules: {
          required: false
        }
      },
    },
    isFormValid: false,
    isCancel: false,
    isShowOrderSummary: false,
  }

  inputChangedHandler = (event, inputIdentify) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentify]
    }
    updatedFormElement.value = event.target.value;

    // Form validation
    let checkedValue = {
      isValid: true,
      errorMessage: []
    };
    if (updatedFormElement.shouldValidate) {
      checkedValue = formValidation(updatedFormElement.value, updatedFormElement.rules);
    }

    updatedFormElement.isTouched = true;
    updatedFormElement.isValid = checkedValue.isValid;
    updatedFormElement.errorMessage = checkedValue.errorMessage;

    updatedOrderForm[inputIdentify] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});

    // Order disbled class
    let readyToOrder = true;
    for (let key in updatedOrderForm) {
      if (!updatedOrderForm[key].isValid) {
        readyToOrder = false;
      }
    }
    this.setState({isFormValid: readyToOrder});
  }

  openOrderSummary = () => {
    this.setState({isShowOrderSummary: true});
  }

  closeOrderSummary = () => {
    this.setState({isShowOrderSummary: false});
  }

  sendOrderHandler = () => {
    const contactData = {};
    for (let key in this.state.orderForm) {
      contactData[key] = this.state.orderForm[key].value;
    };
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: contactData,
      status: 'Order received'
    }

    const updatedOrderData = {
      ...order,
      userId: this.props.userId ? this.props.userId : 'Anonymous'
    };

    this.props.sendOrder(updatedOrderData);
  }

  cancelOrderHandler = () => {
    this.setState({isCancel: true});
  }

  render() {
    let formItems = [];
    for (let key in this.state.orderForm) {
      formItems.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

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
      <Auxiliary>
        {isRedirect}
        <Modal isShow={this.state.isShowOrderSummary} closeModal={this.closeOrderSummary}>
          {modalContent}
        </Modal>
        <div className={classes.OrderFormBox}>
          <h2>Contact Info</h2>
          <form>
            {formItems.map(item => (
              <div className={classes.OrderFormItem} key={item.id}>
                <Input
                  elementType={item.config.elementType}
                  elementConfig={item.config.elementConfig}
                  label={item.config.label}
                  value={item.config.value}
                  changed={(event) => this.inputChangedHandler(event, item.id)}
                  isTouched={item.config.isTouched}
                  isValid={item.config.isValid}
                  errorMessage={item.config.errorMessage}
                  rules={item.config.rules} />
              </div>
            ))}
          </form>

          <div className={classes.SigninText}>
            <p>Please <span><Link to='/signin' className={classes.SuccessText}>Sign In</Link></span> or fill out all your contact info to submit the order</p>
          </div>

          <div className={classes.BtnBox}>
            <Button
                btnType='Danger'
                clicked={this.cancelOrderHandler}
            >Cancel
            </Button>
            <Button
                btnType='Success'
                clicked={this.openOrderSummary}
                disabled={!this.state.isFormValid}
              >Order
            </Button>
          </div>
        </div>
      </Auxiliary>
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
    resetIngredients: () => dispatch(actions.resetIngredient()),
    sendOrder: (orderData) => dispatch(actions.sendOrder(orderData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNotifHandler(OrderForm, axios));