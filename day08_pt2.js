const input = require("fs")
  .readFileSync("day08_input.txt")
  .toString()
  .split("\r\n")

const state = {
  literalCharCount: 0,
  stringCharCount: 0,
}

input.forEach((str) => {
  let newStr = escape(str)
  state.literalCharCount += literalCount(newStr) + 2
  state.stringCharCount += literalCount(str)
})
function literalCount(str) {
  return str.length
}

function escape(str) {
  let newStr = str.replace(/"/g, '9"').replace(/\\/g, "9\\")
  return newStr
}
console.log({ state })

console.log(`The answer is ${state.literalCharCount - state.stringCharCount}`)
