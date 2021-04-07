//day 1
const input = Array.from(
  require("fs").readFileSync("day1_input.txt").toString()
)
//console.log(input)
function move(input) {
  let santa = 0
  input.forEach((x, index) => {
    if (x === "(") {
      santa++
    } else if (x === ")") {
      santa--
    } else {
      console.log(x + "is not a valid input")
    }
    if (santa === -1) {
      console.log(index + 1)
    }
  })
  console.log(santa)
}

move(input)
