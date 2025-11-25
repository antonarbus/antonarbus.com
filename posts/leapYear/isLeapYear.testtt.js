'use client'


// posts/leapYear/isLeapYear.test.js
import { isLeapYear } from './isLeapYear.js'

test('is a leap year', () => {
  expect(isLeapYear('abc')).toEqual(null)
  expect(isLeapYear(0)).toEqual(null)
  expect(isLeapYear(undefined)).toEqual(null)
  expect(isLeapYear(null)).toEqual(null)
  expect(isLeapYear('')).toEqual(null)
  expect(isLeapYear()).toEqual(null)
  expect(isLeapYear(-12345678910)).toEqual('too small number')
  expect(isLeapYear(9007199254740991 + 1)).toEqual('too large number')
  expect(isLeapYear(4000)).toEqual('not leap')
  expect(isLeapYear(8000)).toEqual('not leap')
  expect(isLeapYear(100)).toEqual('not leap')
  expect(isLeapYear(200)).toEqual('not leap')
  expect(isLeapYear(400)).toEqual('leap')
  expect(isLeapYear(1200)).toEqual('leap')
  expect(isLeapYear(5)).toEqual('not leap')
  expect(isLeapYear(4)).toEqual('leap')
  expect(isLeapYear(2024)).toEqual('leap')
  // from the task
  expect(isLeapYear(2000)).toEqual('leap')
  expect(isLeapYear(1700)).toEqual('not leap')
  expect(isLeapYear(1800)).toEqual('not leap')
  expect(isLeapYear(1900)).toEqual('not leap')
  expect(isLeapYear(2100)).toEqual('not leap')
  expect(isLeapYear(2008)).toEqual('leap')
  expect(isLeapYear(2012)).toEqual('leap')
  expect(isLeapYear(2016)).toEqual('leap')
  expect(isLeapYear(2017)).toEqual('not leap')
  expect(isLeapYear(2018)).toEqual('not leap')
  expect(isLeapYear(2019)).toEqual('not leap')
})
