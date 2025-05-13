const input = require("fs").readFileSync("day12_input.json").toString()
var numbers = []

//go over every character, if it is a number, detect the things around it and push to numbers arr
for (let h = 0; h < input.length; h++) {
  if (detectNumberChar(input[h])) {
    //grab substring following
    let subString = input.slice(h, h + 5)
    let [num, finalIndex] = findFullNumber(subString)
    numbers.push(parseInt(num))
    h += finalIndex
  }
}

console.log(numbers)
console.log(`The solution is ${sum(numbers)}`)

function findFullNumber(subString) {
  const num = []
  let finalIndex
  for (let i = 0; i < subString.length; i++) {
    if (detectNumberChar(subString[i])) {
      num.push(subString[i])
    } else {
      finalIndex = i
      break
    }
  }
  return [num.join(""), finalIndex]
}

function detectNumberChar(character) {
  let parsed = parseInt(character)
  return parsed === parsed || character === "-"
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}
