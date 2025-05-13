var input = require("fs").readFileSync("day12_input.json").toString()
var numbers = []
var ignoreIndices = []
for (let g = 0; g < input.length; g++) {
  if (input[g] === "r" && input[g + 1] === "e" && input[g + 2] === "d") {
    let [startingIndex, closingIndex] = returnObjectBoundaries(g)
    let deleteCount = closingIndex - startingIndex + 1
    ignoreIndices.push([startingIndex, deleteCount])
  }
}

console.log(ignoreIndices)

function returnObjectBoundaries(startingIndex) {
  let openingIndex
  let closingIndex
  for (let f = startingIndex; f >= 0; f--) {
    if (input[f] === "[" || input[f] === "{") {
      openingIndex = f
      break
    }
  }
  let requiredClosingBracketCount = 1
  for (let h = startingIndex; h < input.length; h++) {
    if (input[h] === "[" || input[h] === "{") {
      requiredClosingBracketCount++
    } else if (input[h] === "]" || input[h] === "}") {
      requiredClosingBracketCount--
    }
    if (requiredClosingBracketCount === 0) {
      closingIndex = h
      return [openingIndex, closingIndex]
    }
  }
}

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

// console.log(numbers)
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
