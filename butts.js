//parsing input
const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

console.log(input)
console.log(findWireDefintion("f", input))

function findWireDefintion(wire, input) {
  let filteredList = input.filter((line) => {
    let [_left, right] = line.split(" -> ")
    //console.log({ right }, { wire })
    //console.log(right === wire)
    return right === wire
  })
  let [definition, _wire] = filteredList[0].split(" -> ")
  return definition
}
