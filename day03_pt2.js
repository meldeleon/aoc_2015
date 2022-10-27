//day 3 pt 1
const input = Array.from(
  require("fs").readFileSync("day3_input.txt").toString()
)
console.log(input)

let santa = [0, 0]
let santaBot = [0, 0]
let houseArray = input.map((direction, index) => {
  let [x, y] = santa
  let [a, b] = santaBot
  if (index % 2 === 0) {
    if (direction === "^") {
      santa = [x, y + 1]
    } else if (direction === ">") {
      santa = [x + 1, y]
    } else if (direction === "v") {
      santa = [x, y - 1]
    } else if (direction === "<") {
      santa = [x - 1, y]
    } else {
      console.log("invalid input: " + direction)
    }
    console.log(x, y, "santa moved")
    return santa
  } else {
    if (direction === "^") {
      santaBot = [a, b + 1]
    } else if (direction === ">") {
      santaBot = [a + 1, b]
    } else if (direction === "v") {
      santaBot = [a, b - 1]
    } else if (direction === "<") {
      santaBot = [a - 1, b]
    } else {
      console.log("invalid input: " + direction)
    }
    console.log(a, b, "santbot moved")
    return santaBot
  }
})
houseArray.unshift([0, 0])

let stringHouseArray = houseArray.map((house) => {
  return house.toString()
})

let uniqueHouseArray = new Set(stringHouseArray)
console.log(uniqueHouseArray)

console.log(uniqueHouseArray.size)
