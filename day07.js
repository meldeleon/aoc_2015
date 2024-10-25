//define target wire here
const target = "f"

//parsing input
const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")
console.log(input)

console.log(recurseToFindWire(target, input))

function recurseToFindWire(wire, input) {
  // find the definition of the wire
  let operation = findWireDefintion(wire, input).split(" ")
  let operationType = findOperationType(operation)
  // if the definition is just a value, return it
  if (operationType === "VALUE") {
    let wireValue = parseInt(operation[0])
    return wireValue
  } else if (operationType === "WIRE") {
    return recurseToFindWire(operation, input)
  } else if (operationType === "NOT") {
    return performBitwiseOperation(
      operationType,
      recurseToFindWire(operation[1], input)
    )
  } else {
    console.log(`performing bitwise operation:${operationType}`)
    performBitwiseOperation(
      operationType,
      recurseToFindWire(operation[0], input),
      recurseToFindWire(operation[2], input)
    )
  }
}

function findWireDefintion(wire, input) {
  let filteredList = input.filter((line) => {
    let [_left, right] = line.split(" -> ")
    return right === wire
  })
  let [definition, _wire] = filteredList[0].split(" -> ")
  console.log({ definition }, { wire })
  return definition
}

function findOperationType(operation) {
  let numberOfArgs = operation.length
  if (numberOfArgs === 1) {
    if (parseInt(operation[0])) {
      return "VALUE"
    } else {
      return "WIRE"
    }
  } else {
    if (operation[0] === "NOT") {
      return operation[0]
    } else {
      return operation[1]
    }
  }
}
function performBitwiseOperation(operator, a, b) {
  let aVal
  let bVal
  if (checkIfInt(a)) {
    aVal = a
  } else {
    aVal = board[a]
  }
  if (checkIfInt(b)) {
    bVal = b
  } else {
    bVal = board[b]
  }
  //console.log({ aVal }, { bVal })
  //returns bitwise operation result
  switch (operator) {
    case "AND":
      return aVal & bVal & 0xffff
    case "OR":
      return (aVal & 0xffff) | (bVal & 0xffff)
    case "LSHIFT":
      return (aVal << bVal) & 0xffff
    case "RSHIFT":
      return (aVal >> bVal) & 0xffff
    case "NOT":
      return ~aVal & 0xffff
  }
}

function checkIfInt(str) {
  return parseInt(str)
}
