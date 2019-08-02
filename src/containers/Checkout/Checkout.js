import React, {Component} from 'react';
import axios from '../../axios';

import classes from './Checkout.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import OrderForm from '../OrderForm/OrderForm';
import withNotifHandler from '../../hoc/WithNotifHandler/WithNotifHandler';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    },
    isSend: false,
    isCancel: false,
    loading: false
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }

  // sendOrderHandler = () => {
  //   // this.props.history.replace('/checkout/contact-data')
  //   this.setState({loading: true});
  //   const order = {
  //     ingredients: this.state.ingredients,
  //     totalPrice: 7.80,
  //     customer: this.state.contactData
  //   }
  //   axios.post('/orders.json', order)
  //     .then(response => {
  //       this.setState({loading: false});
  //     })
  //     .catch(error => {
  //       this.setState({loading: false});
  //       console.log(error);
  //     })
  // }

  // cancelOrderHandler = () => {
  //   this.props.history.goBack();
  // }

  render() {
    const spinnerDisplayClass = this.state.loading ? classes.Show : classes.Hide;
    return(
      <div className={classes.CheckoutBox}>
        <Backdrop show={this.state.loading} />
        <div className={[classes.SpinnerBox, spinnerDisplayClass].join(' ')}>
          <Spinner isShow={this.state.loading} />
        </div>
        <CheckoutSummary
          ingredients={this.state.ingredients} />
          
        <OrderForm
          sendOrderHandler={this.sendOrderHandler}
          cancelOrderHandler={this.cancelOrderHandler}
          ingredients={this.state.ingredients} />
      </div>
    )
  }
}

export default withNotifHandler(Checkout, axios);