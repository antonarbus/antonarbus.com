// functions/caretTo.js
export default function caretTo(args) {
  const { el, toPos, toStart, toEnd } = { toPos: 0, toStart: false, toEnd: false, ...args }
  el.focus()
  if (toStart) {
    el.setSelectionRange(toPos, toPos)
    return
  }
  if (toEnd) {
    el.setSelectionRange(el.value.length, el.value.length)
    return
  }
  if (toPos < 0) {
    el.setSelectionRange(el.value.length - Math.abs(toPos), el.value.length - Math.abs(toPos))
    return
  }
  el.setSelectionRange(toPos, toPos)
}
