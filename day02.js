//day 2
const input = require("fs")
  .readFileSync("day2_input.txt")
  .toString()
  .split("\r\n")

let paperArray = input.map((x) => {
  let dimensions = x.split("x")
  //console.log(dimensions)
  let [l, w, h] = dimensions
  let sides = [l * w, w * h, h * l]
  //console.log(sides)

  let shortest = Math.min(...sides)
  let wrappingPaper = 2 * l * w + 2 * w * h + 2 * h * l + shortest
  return wrappingPaper
})
//console.log(paperArray)

//let sum = paperArray.reduce((a, b) => a + b, 0)

//console.log(sum)

let ribbonArray = input.map((x) => {
  let dimensions = x.split("x")
  let [l, w, h] = dimensions
  let sides = [l * w, w * h, h * l]
  let smallestSide = 0
  sides.forEach((y, index) => {
    //console.log(y, index, Math.min(...sides))
    if (y === Math.min(...sides)) {
      smallestSide = index
    }
  })
  //console.log(smallestSide)
  let ribbon = 0
  switch (smallestSide) {
    case 0:
      // l * w
      ribbon = 2 * l + 2 * w + l * w * h
      break
    case 1:
      // w * h
      ribbon = 2 * w + 2 * h + l * w * h
      break
    case 2:
      // h * l
      ribbon = 2 * h + 2 * l + l * w * h
      break
    default:
      console.log("that shit cray")
  }
  return ribbon
})

let sum2 = ribbonArray.reduce((a, b) => a + b, 0)
console.log(sum2)
