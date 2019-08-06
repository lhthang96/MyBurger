import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import axios from '../../axios';

import classes from './OrderForm.css';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withNotifHandler from '../../hoc/WithNotifHandler/WithNotifHandler';


import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    loading: false
  }

  formValidation = (input, rules) => {
    let isValid = true;
    let errorMessage = [];

    if (rules.required) {
      if (input.trim() === '') {
        isValid = false;
        errorMessage.push('This field is required.');
      }
    };

    if (rules.minLength) {
      if (input.length < rules.minLength) {
        isValid = false;
        errorMessage.push('Min length is ' + rules.minLength + ' letters.');
      }
    };

    if (rules.maxLength) {
      if (input.length > rules.maxLength) {
        isValid = false;
        errorMessage.push('Max length is ' + rules.maxLength + ' letters.');
      }
    };

    if (rules.isPhone) {
      if (input.length > 11 || input.length < 10) {
        isValid = false;
        errorMessage.push('Invalid phone number.');
      }
    };

    return ({
      isValid: isValid,
      errorMessage: errorMessage
    });
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
      checkedValue = this.formValidation(updatedFormElement.value, updatedFormElement.rules);
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

  sendOrderHandler = () => {
    const contactData = {};
    for (let key in this.state.orderForm) {
      contactData[key] = this.state.orderForm[key].value;
    };
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: contactData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.resetIngredients();
      })
      .catch(error => {
        this.setState({loading: false});
        console.log(error);
      })
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

    const spinnerDisplayClass = this.state.loading ? classes.Show : classes.Hide;
    const isRedirect = this.state.isCancel ? <Redirect to='/burger-builder' /> : null;

    return(
      <Auxiliary>
        {isRedirect}
        <Backdrop show={this.state.loading} />
        <div className={[classes.SpinnerBox, spinnerDisplayClass].join(' ')}>
          <Spinner isShow={this.state.loading} />
        </div>
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
            <p>Please <span>Sign In</span> or fill out all your contact info to submit the order</p>
          </div>

          <div className={classes.BtnBox}>
            <Button
                btnType='Danger'
                clicked={this.cancelOrderHandler}
            >Cancel
            </Button>
            <Button
                btnType='Success'
                clicked={this.sendOrderHandler}
                disabled={!this.state.isFormValid}
              >Order
            </Button>
          </div>
        </div>
      </Auxiliary>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetIngredients: () => dispatch({type: actionTypes.RESET_INGREDIENTS})
  }
}

export default connect(null,mapDispatchToProps)(withNotifHandler(OrderForm, axios));