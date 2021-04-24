import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as orderActions from './actions/orderAction'
import Order from './components/Order'
import Summary from './components/Summary'

function App() {
  const [sellItems, setSellItems] = useState([])
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + 'shiba-book-shop.json'
      )
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData().then((data) => setSellItems(data.books))
  }, [])

  return (
    <div style={{ margin: 20 }}>
      <h1 style={{ textAlign: 'center' }}>{process.env.REACT_APP_NAME}</h1>
      <hr />
      <div className="row">
        <div className="col">
          <div className="row" style={{ textAlign: 'center' }}>
            {sellItems &&
              sellItems.map((item) => (
                <div
                  onClick={() => {
                    dispatch(orderActions.addItem(item))
                  }}
                  key={item.id}
                  style={{
                    fontSize: 14,
                    margin: 10,
                    padding: 10,
                    width: 180,
                    height: 370,
                    border: '1px solid teal',
                    borderRadius: 10
                  }}
                >
                  <img
                    src={item.cover}
                    alt={item.id}
                    style={{ width: 144, height: 220 }}
                  />
                  <p>{item.title}</p>
                  <p> Price : {item.price}</p>
                  <button className="btn btn-primary btn-sm">BUY</button>
                </div>
              ))}
          </div>
        </div>
        <div
          className="col"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h2>Order</h2>
          <div style={{ flex: 2 }}>
            <Order />
          </div>
          <div style={{ flex: 1 }}>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
