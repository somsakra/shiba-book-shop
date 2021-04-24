import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as orderActions from '../actions/orderAction'
import { summaryPrice, summaryDiscount } from '../services/OrderService'

function Summary() {
  const [receive, setReceive] = useState(0)
  const dispatch = useDispatch()
  const orderReducer = useSelector((state) => state.orderReducer)
  const price = summaryPrice(orderReducer.orders)
  const discount = summaryDiscount(orderReducer.orders)
  const netPrice = price - discount
  const change = receive - netPrice

  const handleInputChange = (event) => {
    setReceive(event.target.value)
  }

  return (
    <div
      style={{
        fontSize: 20,
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: 30
      }}
    >
      <table className="table-striped">
        <tbody>
          <tr>
            <td>Price : </td>
            <td id="summary" align="right" style={{ color: 'blue' }}>
              {price}
            </td>
          </tr>
          <tr>
            <td>Discount : </td>
            <td id="discount" align="right" style={{ color: 'green' }}>
              {discount}
            </td>
          </tr>
          <tr>
            <td>Net Price : </td>
            <td align="right" style={{ color: 'blue' }}>
              {netPrice}
            </td>
          </tr>
          <tr>
            <td>Receive : </td>
            <td align="right">
              <input
                style={{ textAlign: 'right' }}
                type="number"
                name="receive"
                value={receive}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Change : </td>
            {change > 0 ? (
              <td align="right" style={{ color: 'green' }}>
                {change}
              </td>
            ) : (
              <td align="right" style={{ color: 'red' }}>
                {change}
              </td>
            )}
          </tr>
          <tr>
            <td></td>
            <td align="right">
              <button
                className="btn btn-info mt-2"
                onClick={() => {
                  dispatch(orderActions.clearItem())
                  setReceive(0)
                }}
              >
                Clear Order
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Summary
