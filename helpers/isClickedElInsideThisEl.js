'use client'

// functions\isClickedWithinEl.js
export function isClickedElInsideThisEl(clickedEl, thisEl) {
  // clickedEl = e.target // within event handler
  if (!thisEl) return
  return thisEl.contains(clickedEl)
}
