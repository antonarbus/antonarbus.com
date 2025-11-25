// pages/api/time_on_server.js
import { ddmmyyyyHHMMSS } from '/functions/ddmmyyyyHHMMSS'

export default async function handler(req, res) {
  const d = new Date()
  res.json({
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
    'd.toGMTString()': d.toGMTString(),
    'd.toLocaleString()': d.toLocaleString(),
    'd.toLocaleDateString()': d.toLocaleDateString(),
    'd.toLocaleTimeString()': d.toLocaleTimeString(),
    'd.toString()': d.toString(),
    'd.toTimeString()': d.toTimeString(),
    'd.toUTCString()': d.toUTCString(),
    'd.valueOf()': d.valueOf(),
    formatted: ddmmyyyyHHMMSS(d.toString()),
    formattedUTC: ddmmyyyyHHMMSS(d.toString(), true)
  })
}
