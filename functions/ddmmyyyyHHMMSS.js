'use client'

// functions/ddmmyyyyHHMMSS.js
export const ddmmyyyyHHMMSS = (date = new Date(), utc = false) => {
  if (isNaN(Date.parse(date))) return 'can not parse date'
  const addZeroToNum = (num) => num.toString().length === 1 ? '0' + num : num
  const d = new Date(date)
  const yyyy = utc ? d.getUTCFullYear() : d.getFullYear()
  const mm = addZeroToNum(utc ? d.getUTCMonth() + 1 : d.getMonth() + 1)
  const dd = addZeroToNum(utc ? d.getUTCDate() : d.getDate())
  const HH = addZeroToNum(utc ? d.getUTCHours() : d.getHours())
  const MM = addZeroToNum(utc ? d.getUTCMinutes() : d.getMinutes())
  const SS = addZeroToNum(utc ? d.getUTCSeconds() : d.getSeconds())
  return `${dd}.${mm}.${yyyy} ${HH}:${MM}:${SS}`
}
