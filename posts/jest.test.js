import axios from 'axios'

test('exact equality', () => {
  expect(2 + 2).toBe(4) // true
})

test('exact equality for objects', () => {
  const obj1 = { a: 1 }
  const obj2 = { a: 1 }
  expect(obj1).not.toBe(obj2) // false
})

test('values equality', () => {
  const obj1 = { a: 1 }
  const obj2 = { a: 1 }
  expect(obj1).toEqual(obj2) // true
})

test('partial equality', () => {
  expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
})

test('toHaveProperty', () => {
  expect({ a: 1, b: 2 }).toHaveProperty('a', 1)
})

test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})

test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2
  // expect(value).toBe(0.3)           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3) // This works.
})

test('hi', () => {
  expect('team').not.toMatch('hi')
})

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})

test('arr contains', () => {
  expect(['1', '2', '3', '4', '5']).toContain('2')
})

test('arr contains', () => {
  expect(['1', '2', '3', '4', '5']).toEqual(expect.arrayContaining(['1', '2']))
})

function functionWithError() {
  throw new Error('very bad error')
}

test('compiling android goes as expected', () => {
  expect(() => functionWithError()).toThrow()
  expect(() => functionWithError()).toThrow(Error)
  expect(() => functionWithError()).toThrow('very bad error')
  expect(() => functionWithError()).toThrow(/bad/)
})

test('get userId from json api', () => {
  return axios('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      expect(res.data.userId).toBe(1)
    })
})

test('get userId from json api with async await', async () => {
  const res = await axios('https://jsonplaceholder.typicode.com/posts/1')
  expect(res.data.userId).toBe(1)
})

test('promise resolves', async () => {
  function promiseWithResolve() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('done'), 500)
    })
  }
  await expect(promiseWithResolve()).resolves.toEqual('done')
})

test('promise rejects', async () => {
  function promiseWithResolve() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('error'), 500)
    })
  }
  await expect(promiseWithResolve()).rejects.toEqual('error')
})

beforeAll(() => {
  console.log('tests start')
})

afterAll(() => {
  console.log('tests ended')
})

describe('matching cities to foods', () => {
  beforeEach(() => {
    console.log('starts before each function in describe block')
  })

  test('one to be one', () => {
    expect(1).toBe(1)
  })

  test('two to be two', () => {
    expect(2).toBe(2)
  })
})

/*
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false)
})

test('this test will not run', () => {
  expect('A').toBe('A')
})
*/

test('mock function basics', () => {
  const mockFn = jest.fn()
  mockFn()
  mockFn('arg1', 'arg2')

  expect(mockFn).toBeCalled()
  expect(mockFn).toBeCalledTimes(2)
  expect(mockFn.mock.calls.length).toBe(2)
  expect(mockFn).toBeCalledWith('arg1', 'arg2') // last call

  console.log('mockFn.mock.calls', mockFn.mock.calls) // [ [], [ 'arg1', 'arg2' ] ]
  expect(mockFn.mock.calls[1][0]).toBe('arg1')
  expect(mockFn.mock.calls[1][1]).toBe('arg2')
})

test('mock function with return value', () => {
  const mockFn = jest.fn()
  mockFn()
  mockFn.mockReturnValue('hi')
  expect(mockFn()).toBe('hi')
  console.log('mockFn.mock.results', mockFn.mock.results) // [ { type: 'return', value: undefined }, { type: 'return', value: 'hi' } ]
})

test('mock function with resolve value', async () => {
  const mockFn = jest.fn()
  mockFn()
  mockFn.mockResolvedValue('hi')
  expect(await mockFn()).toBe('hi')
})

test('mock function with implementation', () => {
  const mockFn = jest.fn()
  mockFn.mockImplementation(arg => {
    if (typeof arg === 'string') return arg
    if (typeof arg === 'number') return 10 * arg
  })
  expect(mockFn('hi')).toBe('hi')
  expect(mockFn(3)).toBe(30)

  // shorthand
  const mockFn2 = jest.fn(arg => 'hi')
  expect(mockFn2('hi')).toBe('hi')
})

test('mock function return different values', () => {
  const mockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockReturnValueOnce('hi')
    .mockReturnValueOnce('bye')

  expect(mockFn()).toBe('hi')
  expect(mockFn()).toBe('bye')
  expect(mockFn()).toBe('default')
})

function applyDiscount(qty, getDiscount) {
  if (qty > 100) {
    return getDiscount(qty)
  }
  return '0%'
}

test('should run getDiscount()', () => {
  const getDiscountMock = jest.fn()
  applyDiscount(101, getDiscountMock)

  getDiscountMock.mockReturnValue('5%')

  const mockFn = jest.fn().mockReturnValue('hi')
  expect(mockFn()).toBe('hi')
})

test('should not run getDiscount()', () => {
  const getDiscountMock = jest.fn()
  applyDiscount(99, getDiscountMock)
  expect(getDiscountMock).not.toBeCalled()
})

test('spyon', async () => {
  const obj = {
    fetchPost: function () {
      return axios('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.data)
    }
  }
  console.log(await obj.fetchPost()) // { userId: 1, id: 1, title: 'sunt' }

  // instead of calling real API we can spy on the function and replace its behavior
  jest.spyOn(obj, 'fetchPost')
    .mockImplementation(() => Promise.resolve('data is fetched, but it is not your business'))
  console.log(await obj.fetchPost()) // data is fetched, but it is not your business
})

test('should mock the lib', () => {
  jest.mock('shortid', () => {
    return jest.fn(() => '23kDr6')
  })

  const id = require('shortid')
  console.log(id()) // '23kDr6'
})

afterEach(() => {
  jest.restoreAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

it('should be 2', () => {
  expect(1 + 1).toBe(2)
})
