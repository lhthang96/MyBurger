import * as actionTypes from './actionTypes';
import * as actions from './burgerBuilder';
import axios from '../../axios';

export const orderSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    id: orderId,
    orderData: orderData
  }
}

export const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: error
  }
}

export const startSendOrder = () => {
  return {
    type: actionTypes.START_SEND_ORDER
  }
}

export const sendOrder = (orderData) => {
  return dispatch => {
    dispatch(startSendOrder());
    axios.post('https://my-burger-9ae73.firebaseio.com/orders.json', orderData)
    .then(res => {
      dispatch(orderSuccess(res.data.name, orderData));
      dispatch(actions.resetIngredient());
    })
    .catch(err => {
      dispatch(orderFail(err));
    })
  }
}

export const initOrdersList = (list) => {
  return {
    type: actionTypes.INIT_ORDERS_LIST,
    ordersList: list
  }
}

export const fetchOrdersList = () => {
  return dispatch => {
    axios.get('https://my-burger-9ae73.firebaseio.com/orders.json')
      .then(res => {
        const ordersList = [];
        for (let key in res.data) {
          ordersList.push({
            id: key,
            orderData: res.data[key]
          });
        };
        dispatch(initOrdersList(ordersList))
      })
    .catch(err => {
      console.log(err);
    })
  }
}