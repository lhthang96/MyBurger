import * as actionType from '../actions/actionTypes';

const initState = {
  ordersList: [],
  loading: true
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.ORDER_SUCCESS:
      return {
        ...state,
        ordersList: state.ordersList.concat({
          id: action.id,
          orderData: action.orderData
        })
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