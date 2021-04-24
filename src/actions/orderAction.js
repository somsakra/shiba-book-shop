import {
  ADD_ITEM_TO_ORDER,
  CLEAR_ORDER,
  REMOVE_ITEM_FROM_ORDER
} from '../Constants'

export const addItemToOrder = (payload) => ({
  type: ADD_ITEM_TO_ORDER,
  payload
})

export const removeItemFromOrder = (payload) => ({
  type: REMOVE_ITEM_FROM_ORDER,
  payload
})

export const clearItemFromOrder = () => ({
  type: CLEAR_ORDER
})

// For Async
export const addItem = (payload) => {
  return (dispatch) => {
    dispatch(addItemToOrder(payload))
  }
}

export const removeItem = (payload) => {
  return (dispatch) => {
    dispatch(removeItemFromOrder(payload))
  }
}

export const clearItem = () => {
  return (dispatch) => {
    dispatch(clearItemFromOrder())
  }
}
