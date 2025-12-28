'use client'

// functions/longClick.js
export function longClick(args) {
  const { el, delay, cb } = {
    el: document && document.documentElement,
    delay: 500,
    cb: function alertClick() {
      alert('clicked')
    },
    ...args
  }

  let pressTimer

  el.addEventListener('mousedown', (e) => {
    pressTimer = setTimeout(() => {
      cb(e)
    }, delay)
  })

  el.addEventListener('mouseup', () => {
    clearTimeout(pressTimer)
  })
}
