import { NextResponse } from 'next/server'
import { ddmmyyyyHHMMSS } from '/functions/ddmmyyyyHHMMSS'

export async function GET() {
  const d = new Date()

  return NextResponse.json({
    'd = new Date()': new Date(),
    'd.getFullYear()': d.getFullYear(),
    'd.getMonth()': d.getMonth(),
    'd.getDate()': d.getDate(),
    'd.getHours()': d.getHours(),
    'd.getMinutes()': d.getMinutes(),
    'd.getSeconds()': d.getSeconds(),
    'd.getMilliseconds()': d.getMilliseconds(),
    'd.getDay()': d.getDay(),
    'd.getTimezoneOffset()': d.getTimezoneOffset(),
    'd.getTime()': d.getTime(),
    'd.getUTCFullYear()': d.getUTCFullYear(),
    'd.getUTCMonth()': d.getUTCMonth(),
    'd.getUTCDate()': d.getUTCDate(),
    'd.getUTCHours()': d.getUTCHours(),
    'd.getUTCMinutes()': d.getUTCMinutes(),
    'd.getUTCSeconds()': d.getUTCSeconds(),
    'd.getUTCMilliseconds()': d.getUTCMilliseconds(),
    'd.getUTCDay()': d.getUTCDay(),
    'd.toDateString()': d.toDateString(),
    'd.toISOString()': d.toISOString(),
    'd.toJSON()': d.toJSON(),
    'd.toUTCString() (was toGMTString)': d.toUTCString(),
    'd.toLocaleString()': d.toLocaleString(),
    'd.toLocaleDateString()': d.toLocaleDateString(),
    'd.toLocaleTimeString()': d.toLocaleTimeString(),
    'd.toString()': d.toString(),
    'd.toTimeString()': d.toTimeString(),
    'd.toUTCString()': d.toUTCString(),
    'd.valueOf()': d.valueOf(),
    formatted: ddmmyyyyHHMMSS(d),
    formattedUTC: ddmmyyyyHHMMSS(d, true)
  })
}
