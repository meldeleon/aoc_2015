//define target wire here
const target = "f"

//parsing input
const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")
console.log(input)

console.log(recurseToFindWire(target, input))

function recurseToFindWire(wire) {
  // find the definition of the wire
  let operation = findWireDefintion(wire).split(" ")
  let operationType = findOperationType(operation)
  // if the definition is just a value, return it
  if (operationType === "VALUE") {
    return parseInt(operation[0])
  } else if (operationType === "WIRE") {
    return recurseToFindWire(operation)
  } else if (operationType === "NOT") {
    return performBitwiseOperation(
      operationType,
      recurseToFindWire(operation[1])
    )
  } else {
    performBitwiseOperation(
      operationType,
      recurseToFindWire(operation[0]),
      recurseToFindWire(operation[2])
    )
  }
}

function findWireDefintion(wire, input) {
  let filteredList = input.filter((line) => {
    let [_left, right] = line.split(" -> ")
    return right === wire
  })
  let [definition, _wire] = filteredList[0].split(" -> ")
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

// function isOperationValid(operation, operationType) {
//   console.log({ operation })
//   switch (operationType) {
//     case "VALUE":
//       return true
//     case "NOT":
//       if (checkIfInt(operation[1]) || board[operation[1]]) {
//         return true
//       } else {
//         return false
//       }
//     case "WIRE":
//     case "LSHIFT":
//     case "RSHIFT":
//       if (board[operation[0]]) {
//         return true
//       } else {
//         return false
//       }
//     case "AND":
//     case "OR":
//       if (
//         (checkIfInt(operation[0]) || board[operation[0]]) &&
//         (checkIfInt(operation[2]) || board[operation[2]])
//       ) {
//         return true
//       } else {
//         return false
//       }
//     default:
//       console.log("Unknown operation type")
//   }
// }
