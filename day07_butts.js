//define target wire here
const promptWire = "f"
//turning input into an arr
const data = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

//turn input into lines with parts for executing a bitwise operation
const instructions = data.map((line) => {
  let lineArr = line.split(" ")
  let targetWire = lineArr[lineArr.length - 1]
  let lineType, parts
  if (line.length > 3) {
    if (lineArr[0] === "NOT") {
      lineType = "NOT"
      parts = [lineArr[1]]
    } else {
      lineType = lineArr[1]
      parts = [lineArr[0], lineArr[2]]
    }
  }
  let instruction = { target: targetWire, type: lineType, inputs: parts }
  return instruction
})
console.log(assignWire(promptWire))

function checkWire(wire) {
  //if wire is known, return wire
  //else find wire
}

function assignWire(wire) {
  let instruction = instructions.filter((line) => line.target === wire)[0]
  //console.log({ wire }, { instruction })
  let { target, type, inputs } = instruction
  switch (type) {
    case "->":
      if (isInt(inputs[0])) {
        return inputs[0]
      } else {
        return assignWire(inputs[0])
      }
    case "NOT":
      return ~assignWire(inputs[0]) & 0xffff
    case "AND":
      if (isInt(inputs[0])) {
        return inputs[0] & assignWire(inputs[1]) & 0xffff
      } else {
        return assignWire(inputs[0]) & assignWire(inputs[1]) & 0xffff
      }
    case "OR":
      return (assignWire(inputs[0]) & 0xffff) | (assignWire(inputs[1]) & 0xffff)
    case "LSHIFT":
      return (assignWire(inputs[0]) << inputs[1]) & 0xffff
    case "RSHIFT":
      return (assignWire(inputs[0]) >> inputs[1]) & 0xffff
  }
}

function isInt(test) {
  if (parseInt(test) === 0) {
    return true
  } else {
    return parseInt(test)
  }
}
