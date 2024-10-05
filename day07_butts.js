/* Notes for Future Mel:
You have small input working, you unfortunately do not have big input working because you do not account for the following cases:
1. assigning a wire to a wire
2. XOR/AND can happen between a number and wire, or two numbers
*/

//parsing input
const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

const board = new Set()
runOperations(input)
console.log(board)
console.log(`The answer is ${board.a}`)

//while loop that runs as long as the # of "doable" operations < the number of operations

function runOperations(input) {
  let operationsLength = input.length
  let possibleOperations = 0
  let n = 0
  while (possibleOperations < operationsLength || n === 1000) {
    input.forEach((line) => {
      let [left, right] = line.split(" -> ")
      console.log(`right before ${right}`)
      let operation = left.split(" ")
      let operationType = findOperationType(operation)
      if (isOperationValid(operation, operationType)) {
        console.log(`right after ${right}`)
        possibleOperations++
        if (operationType === "VALUE") {
          //assign value to a wire on theboard
          board[right] = parseInt(left)
        } else if (operationType === "WIRE") {
          //assign a wire to a wire on the board
          board[right] = board[operation[0]]
        } else if (operationType === "NOT") {
          board[right] = performBitwiseOperation(operationType, operation[1])
        } else {
          board[right] = performBitwiseOperation(
            operationType,
            operation[0],
            operation[2]
          )
        }
      }
    })
    n++
    console.log({ possibleOperations }, { n })
  }
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

function isOperationValid(operation, operationType) {
  //console.log({ operation }, { operationType })
  //we should only execute and operation if we know the values of all of the wires on the lefthand side of the operation
  //we are asumming that operation is an array of the lefthand of the assignment
  //operation types:
  switch (operationType) {
    case "VALUE":
      return true
    case "NOT":
      if (checkIfInt(operation[1]) || board[operation[1]]) {
        return true
      } else {
        return false
      }
    case "WIRE":
    case "LSHIFT":
    case "RSHIFT":
      if (board[operation[0]]) {
        return true
      } else {
        return false
      }
    case "AND":
    case "OR":
      if (
        (checkIfInt(operation[0]) || board[operation[0]]) &&
        (checkIfInt(operation[2]) || board[operation[2]])
      ) {
        return true
      } else {
        return false
      }
    default:
      console.log("Unknown operation type")
  }
}
