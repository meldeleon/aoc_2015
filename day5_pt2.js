const { truncate } = require("fs")

const input = Array.from(
  require("fs").readFileSync("day5_input.txt").toString().split("\r\n")
)
let count = 0
input.forEach((str) => {
  if (checkRepeatingPair(str) && checkforSandwich(str)) {
    count++
  } else {
    return
  }
})
console.log(count)

//ch3ck f0r r3p34t1ng p41r
function checkRepeatingPair(str) { //not wild about this variable name. I would name what it is, like "pair"
  let strArray = Array.from(str)
  let pairArray = strArray.map((x, index) => {
    if (index < strArray.length - 1) {
      let pair = []
      pair = [x, strArray[index + 1]]
      return pair
    }
  })
  let pairRepeatCount = 0
  pairArray.forEach((pair, index) => {
    for (y = index + 1; y < pairArray.length - 1; y++) {
      console.log(pair, pairArray[y])
      if (pairArray[y].toString() === pair.toString() && y !== index + 1) {
        pairRepeatCount++
      }
    }
  })
  if (pairRepeatCount > 0) {
    return true
  } else {
    return false
  }
}

//check for a sandwich
function checkforSandwich(str) {
  let strArray = Array.from(str)
  let sandwichCount = 0
  let pairArray = strArray.forEach((character, index) => {
    console.log(character, strArray[index + 2])
    if (character === strArray[index + 2]) {
      sandwichCount++
    } else {
      //do nothing
    }
  })

  if (sandwichCount > 0) {
    return true
  } else {
    return false
  }
}
