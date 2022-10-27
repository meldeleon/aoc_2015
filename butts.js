const input = require("fs")
  .readFileSync("day08_input.txt")
  .toString()
  .split("\r\n")
console.log(input)
const butts = []
input.forEach((str) => {
  butts.push(escape(str))
})

function escape(str) {
  let newStr = str.replace(/"/g, '9"').toString()
  return newStr
}
console.log(butts)
