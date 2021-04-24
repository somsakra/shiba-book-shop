import {
  addItemToOrder,
  removeItemFromOrder,
  summaryPrice,
  summaryDiscount
} from '../OrderService'

describe('Add Item to Orders', () => {
  test('Item was not in orders => add item with 1 unit', () => {
    const orders = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 3
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const itemToAdd = {
      cover: 'cover-picture.jpg',
      price: '260',
      title: 'Item-title',
      id: '1234567891011'
    }
    const expectedResult = [
      ...orders,
      {
        cover: 'cover-picture.jpg',
        price: '260',
        title: 'Item-title',
        id: '1234567891011',
        unit: 1
      }
    ]
    const result = addItemToOrder(orders, itemToAdd)
    expect(result).toEqual(expectedResult)
  })
  test('Item already in orders => update existing order by increase unit', () => {
    const orders = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 3
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const itemToAdd = {
      cover: 'cover-picture-1.jpg',
      price: '350',
      title: 'title-1',
      id: '1111111111111'
    }
    const expectedResult = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 4
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const result = addItemToOrder(orders, itemToAdd)
    expect(result).toEqual(expectedResult)
  })
})

describe('Remove Item From Order', () => {
  test('Item already in orders => update existing order by decrease unit', () => {
    const orders = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 3
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const itemToRemove = {
      cover: 'cover-picture-1.jpg',
      price: '350',
      title: 'title-1',
      id: '1111111111111'
    }
    const expectedResult = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 2
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const result = removeItemFromOrder(orders, itemToRemove)
    expect(result).toEqual(expectedResult)
  })
  test('Item has only 1 left in order => remove item from order', () => {
    const orders = [
      {
        cover: 'cover-picture-1.jpg',
        price: '350',
        title: 'title-1',
        id: '1111111111111',
        unit: 1
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const itemToRemove = {
      cover: 'cover-picture-1.jpg',
      price: '350',
      title: 'title-1',
      id: '1111111111111'
    }
    const expectedResult = [
      {
        cover: 'cover-picture-2.jpg',
        price: '350',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const result = removeItemFromOrder(orders, itemToRemove)
    expect(result).toEqual(expectedResult)
  })
})

describe('Test Summary Price', () => {
  test("Summary Price = summary of unit's price * unit", () => {
    const orders = [
      {
        cover: 'cover-picture-1.jpg',
        price: '123',
        title: 'title-1',
        id: '1111111111111',
        unit: 1
      },
      {
        cover: 'cover-picture-2.jpg',
        price: '345',
        title: 'title-2',
        id: '2222222222222',
        unit: 4
      }
    ]
    const expectedResult = 123 * 1 + 345 * 4
    const result = summaryPrice(orders)
    expect(result).toEqual(expectedResult)
  })
})

describe('Test Summary Discount', () => {
  test('No promotion item in orders => 0% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2413/9780241392362.jpg',
        price: '260',
        title: 'The Fork, the Witch, and the Worm',
        id: '9780241392362',
        unit: 5
      }
    ]
    const expectedResult = 0
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy only 1 of promotion item => 0% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '350',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2413/9780241392362.jpg',
        price: '260',
        title: 'The Fork, the Witch, and the Worm',
        id: '9780241392362',
        unit: 5
      }
    ]
    const expectedResult = 0
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 2 unique of promotion item => 10% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      }
    ]
    const expectedResult = 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 3 unique of promotion item => 11% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 2
      }
    ]
    const expectedResult = 11 * 3
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 4 unique of promotion item => 12% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 2
      }
    ]
    const expectedResult = 12 * 4
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 5 unique of promotion item => 13% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 2
      }
    ]
    const expectedResult = 13 * 5
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 6 unique of promotion item => 14% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '100',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        unit: 2
      }
    ]
    const expectedResult = 14 * 6
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 7 unique of promotion item => 15% discount', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '100',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855713.jpg',
        price: '100',
        title: 'Harry Potter and the Deathly Hallows (VII)',
        id: '9781408855713',
        unit: 2
      }
    ]
    const expectedResult = 15 * 7
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 1 set of promotion item [1,1,0,0,0,0,0]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2413/9780241392362.jpg',
        price: '260',
        title: 'The Fork, the Witch, and the Worm',
        id: '9780241392362',
        unit: 3
      }
    ]
    const expectedResult = 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 2 set of promotion item [1,2,3,0,0,0,0]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      }
    ]
    const expectedResult = 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 3 set of promotion item [1,2,3,4,0,0,0]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 4
      }
    ]
    const expectedResult = 12 * 4 + 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 4 set of promotion item [1,2,3,4,5,0,0]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 4
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 5
      }
    ]
    const expectedResult = 13 * 5 + 12 * 4 + 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 5 set of promotion item [1,2,3,4,5,6,0]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 4
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 5
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '100',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        unit: 6
      }
    ]
    const expectedResult = 14 * 6 + 13 * 5 + 12 * 4 + 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 6 set of promotion item [1,2,3,4,5,6,7]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 1
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 4
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 5
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '100',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        unit: 6
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855713.jpg',
        price: '100',
        title: 'Harry Potter and the Deathly Hallows (VII)',
        id: '9781408855713',
        unit: 7
      }
    ]
    const expectedResult = 15 * 7 + 14 * 6 + 13 * 5 + 12 * 4 + 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
  test('Buy 6 set of promotion item [2,2,3,4,5,6,7]', () => {
    const orders = [
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
        price: '100',
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: '9781408855652',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
        price: '100',
        title: 'Harry Potter and the Chamber of Secrets (II)',
        id: '9781408855669',
        unit: 2
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855676.jpg',
        price: '100',
        title: 'Harry Potter and the Prisoner of Azkaban (III)',
        id: '9781408855676',
        unit: 3
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855683.jpg',
        price: '100',
        title: 'Harry Potter and the Goblet of Fire (IV)',
        id: '9781408855683',
        unit: 4
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
        price: '100',
        title: 'Harry Potter and the Order of the Phoenix (V)',
        id: '9781408855690',
        unit: 5
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855706.jpg',
        price: '100',
        title: 'Harry Potter and the Half-Blood Prince (VI)',
        id: '9781408855706',
        unit: 6
      },
      {
        cover:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855713.jpg',
        price: '100',
        title: 'Harry Potter and the Deathly Hallows (VII)',
        id: '9781408855713',
        unit: 7
      }
    ]
    const expectedResult = 15 * 7 + 15 * 7 + 13 * 5 + 12 * 4 + 11 * 3 + 10 * 2
    const result = summaryDiscount(orders)
    expect(result).toEqual(expectedResult)
  })
})
