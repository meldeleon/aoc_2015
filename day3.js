//day 3 pt 1
const input = Array.from(
  require("fs").readFileSync("day3_input.txt").toString()
)
debugger

let santa = [0, 0]

let houseArray = input.map((direction) => { //yay! this variable name
  let [x, y] = santa
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
  return santa
})
houseArray.unshift([0, 0])

let stringHouseArray = houseArray.map((house) => {
  return house.toString()
})

let uniqueHouseArray = new Set(stringHouseArray)
