const addItemToOrder = (orders, itemToAdd) => {
  const alreadyInOrder = orders.filter((item) => item.id === itemToAdd.id)

  if (alreadyInOrder.length > 0) {
    return orders.map((item) =>
      item.id === itemToAdd.id ? { ...item, unit: item.unit + 1 } : item
    )
  }
  return [...orders, { ...itemToAdd, unit: 1 }]
}

const removeItemFromOrder = (orders, itemToRemove) => {
  const itemInOrder = orders.filter((item) => item.id === itemToRemove.id)

  if (itemInOrder[0].unit === 1) {
    return orders.filter((item) => item.id !== itemToRemove.id)
  }
  return orders.map((item) =>
    item.id === itemToRemove.id ? { ...item, unit: item.unit - 1 } : item
  )
}

const summaryPrice = (orders) => {
  let summaryPrice = 0
  for (let i = 0; i < orders.length; i++) {
    summaryPrice = summaryPrice + orders[i].price * orders[i].unit
  }
  return summaryPrice
}

const summaryDiscount = (orders) => {
  let discount = 0
  const promotionItems = _filterPromotionItems(orders)

  const OrderSet1 = JSON.parse(JSON.stringify(promotionItems))
  discount = discount + _discountPerSet(OrderSet1) * _minimumUnit(OrderSet1)

  const OrderSet2 = _removeAlreadyDiscount(OrderSet1, _minimumUnit(OrderSet1))
  discount = discount + _discountPerSet(OrderSet2) * _minimumUnit(OrderSet2)

  const OrderSet3 = _removeAlreadyDiscount(OrderSet2, _minimumUnit(OrderSet2))
  discount = discount + _discountPerSet(OrderSet3) * _minimumUnit(OrderSet3)

  const OrderSet4 = _removeAlreadyDiscount(OrderSet3, _minimumUnit(OrderSet3))
  discount = discount + _discountPerSet(OrderSet4) * _minimumUnit(OrderSet4)

  const OrderSet5 = _removeAlreadyDiscount(OrderSet4, _minimumUnit(OrderSet4))
  discount = discount + _discountPerSet(OrderSet5) * _minimumUnit(OrderSet5)

  const OrderSet6 = _removeAlreadyDiscount(OrderSet5, _minimumUnit(OrderSet5))
  discount = discount + _discountPerSet(OrderSet6) * _minimumUnit(OrderSet6)

  const OrderSet7 = _removeAlreadyDiscount(OrderSet6, _minimumUnit(OrderSet6))
  discount = discount + _discountPerSet(OrderSet7) * _minimumUnit(OrderSet7)

  return Math.floor(discount)
}

const _filterPromotionItems = (orders) => {
  return orders.filter((item) => item.id !== '9780241392362')
}

const _minimumUnit = (orders) => {
  let min = 10000000
  for (let i = 0; i < orders.length; i++) {
    if (min > orders[i].unit) {
      min = orders[i].unit
    }
  }
  return min
}

const _discountRate = (promotionItems) => {
  switch (promotionItems.length) {
    case 1:
      return 0
    case 2:
      return 0.1
    case 3:
      return 0.11
    case 4:
      return 0.12
    case 5:
      return 0.13
    case 6:
      return 0.14
    case 7:
      return 0.15
    default:
      return 0
  }
}

const _discountCalculate = (items, discountRate) => {
  let discount = 0
  for (let i = 0; i < items.length; i++) {
    discount = discount + items[i].price * discountRate
  }
  return discount
}

const _discountPerSet = (promotionItems) => {
  const discountRate = _discountRate(promotionItems)
  return _discountCalculate(promotionItems, discountRate)
}

const _removeAlreadyDiscount = (promotionItems, numberToRemove) => {
  for (let i = 0; i < promotionItems.length; i++) {
    promotionItems[i].unit = Number(promotionItems[i].unit) - numberToRemove
  }
  return promotionItems.filter((item) => item.unit !== 0)
}

export { addItemToOrder, removeItemFromOrder, summaryPrice, summaryDiscount }
