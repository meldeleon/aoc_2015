/* Notes for Future Mel:
You have small input working, you unfortunately do not have big input working because you do not account for the following cases:
1. assigning a wire to a wire
2. XOR/AND can happen between a number and wire, or two numbers
*/

const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

const board = new Set()
runOperations(input)
console.log(board)
console.log(`The answer is ${board.a}`)

function runOperations(input) {
  input.forEach((line) => {
    let [left, right] = line.split(" -> ")
    let operation = left.split(" ")
    let operationType = findOperationType(operation)
    if (operationType === "VALUE") {
      //assign wire to board
      board[right] = parseInt(left)
    } else if (operationType === "NOT") {
      board[right] = performBitwiseOperation(operationType, operation[1])
    } else {
      board[right] = performBitwiseOperation(
        operationType,
        operation[0],
        operation[2]
      )
    }
  })
}

function findOperationType(operation) {
  // returns VAL for assignment or Bitwise Operator
  if (parseInt(operation[0])) {
    return "VALUE"
  } else {
    if (operation[0] === "NOT") {
      return operation[0]
    } else {
      return operation[1]
    }
  }
}

function performBitwiseOperation(operator, a, b) {
  //returns bitwise operation result
  switch (operator) {
    case "AND":
      return board[a] & board[b] & 0xffff
    case "OR":
      return (board[a] ^ board[b]) & 0xffff
    case "LSHIFT":
      return (board[a] << parseInt(b)) & 0xffff
    case "RSHIFT":
      return (board[a] >> parseInt(b)) & 0xffff
    case "NOT":
      return ~board[a] & 0xffff
  }
}
