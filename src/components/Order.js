import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as orderAction from '../actions/orderAction'

function Order() {
  const orderReducer = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()
  const orders = orderReducer.orders

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td> x {order.unit}</td>
                <td onClick={() => dispatch(orderAction.addItem(order))}>⬆️</td>
                <td onClick={() => dispatch(orderAction.removeItem(order))}>
                  ⬇️
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Order Item</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Order
