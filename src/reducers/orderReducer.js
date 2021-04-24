import {
  ADD_ITEM_TO_ORDER,
  CLEAR_ORDER,
  REMOVE_ITEM_FROM_ORDER
} from '../Constants'

import * as orderService from '../services/OrderService'

const initialState = {
  orders: []
}

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_TO_ORDER:
      return {
        ...state,
        orders: orderService.addItemToOrder(state.orders, payload)
      }

    case REMOVE_ITEM_FROM_ORDER:
      return {
        ...state,
        orders: orderService.removeItemFromOrder(state.orders, payload)
      }
    case CLEAR_ORDER:
      return {
        ...state,
        orders: []
      }

    default:
      return state
  }
}

export default orderReducer
