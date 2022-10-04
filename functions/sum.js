export const sum = (...nums) => {
  let arr = []
  // may pass array or args separately
  if (!Array.isArray(nums)) arr = [...nums] // if primitive args supplied
  if (Array.isArray(nums)) arr = nums.flat(Infinity) // if array supplied
  const floatsArr = arr.map(el => parseFloat(el)) // in case numbers are passed as strings
  const sum = floatsArr.reduce((accum, curVal) => accum + curVal, 0)
  return sum
}
