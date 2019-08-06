import * as actionType from '../actions/actionTypes';

const initState = {
  ordersList: [],
  error: false,
  errorMessage: '',
  loading: true,
  sendLoading: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.ORDER_SUCCESS:
      return {
        ...state,
        sendLoading: false,
        ordersList: state.ordersList.concat({
          id: action.id,
          orderData: action.orderData
        })
      }

    case actionType.ORDER_FAIL:
      return {
        ...state,
        sendLoading: false,
        error: true,
        errorMessage: action.error
      }

    case actionType.START_SEND_ORDER:
      return {
        ...state,
        sendLoading: true
      }

    case actionType.INIT_ORDERS_LIST:
      return {
        ...state,
        ordersList: action.ordersList,
        loading: false
      }

    default: return state
  }
}