import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initState = {
  ordersList: [],
  error: false,
  errorMessage: '',
  loading: true,
  sendLoading: false
}

const orderSuccess = (state, action) => {
  return updatedObject(state, {
    sendLoading: false,
    ordersList: state.ordersList.concat({
      id: action.id,
      orderData: action.orderData
    })
  });
}

const orderFail = (state, action) => {
  return updatedObject(state, {
    sendLoading: false,
    error: true,
    errorMessage: action.error
  });
}

const startSendOrder = (state, action) => {
  return updatedObject(state, {sendLoading: true});
}

const initOrdersList = (state, action) => {
  return updatedObject(state, {
    ordersList: action.ordersList,
    loading: false
  })
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.ORDER_SUCCESS:
      return orderSuccess(state, action);

    case actionType.ORDER_FAIL:
      return orderFail(state, action);

    case actionType.START_SEND_ORDER:
      return startSendOrder(state, action);

    case actionType.INIT_ORDERS_LIST:
      return initOrdersList(state, action);

    default: return state
  }
}