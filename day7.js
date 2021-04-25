const { match } = require("assert")

const input = require("fs")
  .readFileSync("day7_input.txt")
  .toString()
  .split("\r\n")

let queue = [...input]
let board = {}

/*number  -> wire
wire OPERATOR wire -> wire
wire OPERATOR number -> wire
NOT wire -> NOT
*/


function parseCommand(command) {
  let cmdArray = command.split(" ")
  if (cmdArray[0] === not) {
    //complement
  } else if (cmdArray[1] === "->") {
    // basic assignment
  } else {
    if ()
  }
}

// let basicAssignments = input.filter((x) => x.match(/(^\d* ->)/g))
// basicAssignments.forEach((x) => {
//   board[x.match(/.$/g).toString()] = intTo16Bit(x.match(/.$/g))
// })
// console.log(board)
// // iterate over the known wires, and find assignments that use only a known value.
// Object.entries(board).forEach((x) => {})



function bitwiseAnd(arr1, arr2) {
  let y = arr2[index]
  return arr1.map((x, index) => {
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
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.unshift(0)
    shiftedArr.pop()
  }
  return shiftedArr
}

function bitwiseLShift(arr, shiftNumber) {
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.push(0)
    shiftedArr.shift()
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
