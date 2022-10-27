const input = require("fs")
  .readFileSync("day7_input.txt")
  .toString()
  .split("\r\n")

let board = {}
let allWires = Array.from(
  new Set(
    input.map((x) => {
      let [leftHand, wire] = x.split(" -> ")
      return wire
    })
  )
)
console.log(allWires)

while (allWires.length > 0) {
  input.forEach((operation) => {
    parseOperation(operation)
  })
}

console.log(board.a)

function uint16(n) {
  return n & 0xffff
}

function parseOperation(operation) {
  console.log("evaluating: " + operation)
  let [leftHand, wire] = operation.split(" -> ")
  let leftHandArray = leftHand.split(" ")

  //pattern 123 -> x
  if (parseInt(leftHand) && leftHandArray.length === 1) {
    board[wire] = leftHand
    wireFound(wire)
  }
  //pattern NOT
  else if (leftHandArray[0] === "NOT" && board[leftHandArray[1]]) {
    board[wire] = uint16(~board[leftHandArray[1]])
    wireFound(wire)
  }
  //pattern OR
  else if (
    leftHandArray[1] === "OR" &&
    board[leftHandArray[0]] &&
    board[leftHandArray[2]]
  ) {
    board[wire] =
      uint16(board[leftHandArray[0]]) | uint16(board[leftHandArray[2]])
    wireFound(wire)
  }
  //pattern AND
  else if (
    leftHandArray[1] === "AND" &&
    board[leftHandArray[0]] &&
    board[leftHandArray[2]]
  ) {
    if (parseInt(leftHandArray[0]) === "1") {
      board[wire] = uint16(leftHandArray[0]) & uint16(board[leftHandArray[2]])
    } else {
      board[wire] =
        uint16(board[leftHandArray[0]]) & uint16(board[leftHandArray[2]])
    }
  }

  //pattern LSHIFT
  else if (leftHandArray[1] === "LSHIFT" && board[leftHandArray[0]]) {
    board[wire] = uint16(board[leftHandArray[0]]) << uint16(leftHandArray[2])
  }
  //pattern RSHIFT
  else if (leftHandArray[1] === "RSHIFT" && board[leftHandArray[0]]) {
    board[wire] = uint16(board[leftHandArray[0]]) >> uint16(leftHandArray[2])
  }
}

function wireFound(wire) {
  let indexOfWire = allWires.indexOf(wire)
  allWires.splice(indexOfWire, 1)
  console.log("number of unknown wires: " + allWires.length)
}
