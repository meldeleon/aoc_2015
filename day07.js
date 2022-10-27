const input = require("fs")
  .readFileSync("day7_input.txt")
  .toString()
  .split("\r\n")

let queue = [...input]
let board = {}

runOperations(queue)
Object.keys(board).forEach((x) => {
  board[x] = bitToInt(board[x])
})
console.log(board)
console.log(board[a])

function runOperations(instructions) {
  while (queue.length > 0) {
    queue.forEach((x, index) => {
      if (parseCommand(x) === null) {
        return
      } else {
        parseCommand(x)
        queue.splice(index, 1)
      }
    })
  }
}
function parseCommand(command) {
  let [instruction, destinationWire] = command.split(" -> ")
  instructionArray = instruction.split(" ")
  //console.log(instructionArray, destinationWire)
  if (instructionArray[0] === "NOT") {
    if (board[instructionArray[1]]) {
      board[destinationWire] = bitwiseComplement(board[instructionArray[1]])
    } else {
      // if left-hand wires not defined, punt
      return null
    }
  } else if (instructionArray.length === 1) {
    board[destinationWire] = intTo16Bit(instructionArray[0])
  } else {
    let [operand1, operator, operand2] = instructionArray
    switch (operator) {
      case "OR":
        if (board[operand1] && board[operand2]) {
          board[destinationWire] = bitwiseOr(board[operand1], board[operand2])
        } else {
          return null
        }
        break
      case "AND":
        if (board[operand1] && board[operand2]) {
          board[destinationWire] = bitwiseAnd(board[operand1], board[operand2])
        } else {
          return null
        }
        break
      case "LSHIFT":
        if (board[operand1]) {
          board[destinationWire] = bitwiseLShift(board[operand1], operand2)
        } else {
          return null
        }
        break
      case "RSHIFT":
        if (board[operand1]) {
          board[destinationWire] = bitwiseRShift(board[operand1], operand2)
        } else {
          return null
        }
        break
    }
  }
}

function bitwiseAnd(arr1, arr2) {
  return arr1.map((x, index) => {
    let y = arr2[index]
    return x * y
  })
}

function bitwiseOr(arr1, arr2) {
  return arr1.map((x, index) => {
    let y = arr2[index]
    if (x === 1 || y === 1) {
      return 1
    } else {
      return 0
    }
  })
}

function bitwiseRShift(arr, shiftNumber) {
  shiftNumber = parseInt(shiftNumber)
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.unshift(0)
    shiftedArr.pop()
  }
  return shiftedArr
}

function bitwiseLShift(arr, shiftNumber) {
  shiftNumber = parseInt(shiftNumber)
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.shift()
    shiftedArr.push(0)
  }
  return shiftedArr
}

function bitwiseComplement(arr) {
  return arr.map((x) => {
    return 1 - x
  })
}

function intTo16Bit(int) {
  let bitArray = []
  for (i = 0; i < 16; i++) {
    let power = 2 ** (15 - i)
    if (int / power >= 1) {
      bitArray[i] = 1
    } else {
      bitArray[i] = 0
    }
    int = int % power
  }
  return bitArray
}

function bitToInt(arr) {
  let int = 0
  arr.forEach((x, index) => {
    if (x === 1) {
      int += 2 ** (15 - index)
    }
  })
  return int
}
