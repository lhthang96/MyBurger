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
    axios.post('/orders.json', orderData)
    .then(res => {
      dispatch(orderSuccess(res.data.name, orderData));
      dispatch(actions.resetIngredient());
    })
    .catch(err => {
      dispatch(orderFail(err));
    })
  }
}

export const fetchOrdersListSuccess = (list) => {
  return {
    type: actionTypes.FETCH_ORDERS_LIST_SUCCESS,
    ordersList: list
  }
}

export const fetchOrdersListFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_LIST_FAIL,
    error: error
  }
}

export const fetchOrdersList = () => {
  return dispatch => {
    axios.get('/orders')
      .then(res => {
        const ordersList = [];
        for (let key in res.data) {
          ordersList.push({
            id: key,
            orderData: res.data[key]
          });
        };
        dispatch(fetchOrdersListSuccess(ordersList))
      })
    .catch(err => {
      dispatch(fetchOrdersListFail(err));
    })
  }
}