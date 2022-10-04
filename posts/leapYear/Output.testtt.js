import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { isLeapYear } from './isLeapYear'
import { Output } from './Output'

test('Output component exists', () => {
  render(<Output/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toBeInTheDocument()
})

test('Year is not provided', () => {
  render(<Output yearTypeState={null}/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toHaveTextContent('Year is not provided')
})

test('Yes', () => {
  render(<Output yearTypeState={isLeapYear(2000)}/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toHaveTextContent('Yes')
})

test('No', () => {
  render(<Output yearTypeState={isLeapYear(1700)}/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toHaveTextContent('No')
})

test('The Earth doesn\'t exist anymore 😞', () => {
  render(<Output yearTypeState={isLeapYear(9007199254740991 + 1)}/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toHaveTextContent('The Earth doesn\'t exist anymore 😞')
})

test('The Earth is not formed yet 😞', () => {
  render(<Output yearTypeState={isLeapYear(-12345678910)}/>)
  const cmpt = screen.getByTestId('output')
  expect(cmpt).toHaveTextContent('The Earth is not formed yet 😞')
})
