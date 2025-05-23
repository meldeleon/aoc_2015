const input = require("fs").readFileSync("day12_input.json").toString()
const inputObj = JSON.parse(input)

let callstack = 0
//console.log(inputObj.e[0])

console.log(`the answer is ${evaluateNode(inputObj)}`)
function evaluateNode(inputObj) {
  let count = 0
  for ([key, value] of Object.entries(inputObj)) {
    console.log(key, value, callstack)
    //if red is there, we know the value of this node is essentially zero; so return 0
    if (typeof value === "string") {
      if (value === "red" && !Array.isArray(inputObj)) {
        return 0
      }
    }
    //if it's a value, add to count
    else if (typeof value === "number") {
      count += value
    }
    //if it is an object or array; recurse and add return to count
    else {
      callstack++
      count += evaluateNode(value)
    }
    // if obj or array recurse
  }
  return count
}
