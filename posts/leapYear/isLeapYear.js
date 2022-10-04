export function isLeapYear(inputVal) {
  const year = Number(inputVal)
  // if string or zero
  if (isNaN(year) || year === 0) return null
  // if number is too big
  if (year > Number.MAX_SAFE_INTEGER) return 'too large number'
  // if number is too small
  if (year < -4.543e9) return 'too small number'
  // eliminate years divisible by 4000 as leap years
  if (year % 4000 === 0) return 'not leap'
  // years divisible by 100 but not by 400 are NOT leap years
  if (year % 100 === 0 && year % 400 !== 0) return 'not leap'
  // years not divisible by 4 are NOT leap years
  if (year % 4 !== 0) return 'not leap'
  // years divisible by 400 ARE leap years
  if (year % 400 === 0) return 'leap'
  // years divisible by 4 but not by 100 ARE leap years
  if (year % 4 === 0 && year % 100 !== 0) return 'leap'
  // all others
  return 'not leap'
}
