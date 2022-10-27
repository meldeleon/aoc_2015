const input = require("fs")
  .readFileSync("day6_input.txt")
  .toString()
  .split("\r\n")

const lightGrid = []
for (let i = 0; i < 1000; i++) {
  lightGrid[i] = []
  for (j = 0; j < 1000; j++) {
    lightGrid[i][j] = 0
  }
}

function instruction(str) {
  // 0 is off, 1 is on, 2 is toggle
  let numberSet = str.match(/\d+/g).map((x) => {
    return parseInt(x)
  })
  firstSet = [numberSet[0], numberSet[1]]
  secondSet = [numberSet[2], numberSet[3]]
  if (str.match(/^toggle/g)) {
    return [2, firstSet, secondSet]
  } else if (str.match(/^turn off/g)) {
    return [0, firstSet, secondSet]
  } else {
    return [1, firstSet, secondSet]
  }
}

function executeInstruction(instruction) {
  switch (instruction[0]) {
    case 0:
      changeGrid(0, instruction)
      break
    case 1:
      changeGrid(1, instruction)
      break
    case 2:
      changeGrid(2, instruction)
      break
    default:
    // do nothing
  }
}
function changeGrid(state, instruction) {
  let iMin = instruction[1][0]
  // FIRST set, first number
  let iMax = instruction[2][0]
  // SECOND set, first number
  let jMin = instruction[1][1]
  // FIRST set, second number
  let jMax = instruction[2][1]
  // SECOND set, second number
  for (i = iMin; i <= iMax; i++) {
    for (j = jMin; j <= jMax; j++) {
      if (state === 0) {
        lightGrid[i][j]--
        if (lightGrid[i][j] < 0) {
          lightGrid[i][j] = 0
        }
      } else if (state === 1) {
        lightGrid[i][j]++
      } else {
        lightGrid[i][j] += 2
      }
    }
  }
}

input.forEach((x) => {
  executeInstruction(instruction(x))
})

let totalLightsFlatMap = []
let totalLights = 0
for (let i = 0; i < lightGrid.length; i++) {
  for (let j = 0; j < lightGrid[i].length; j++) {
    totalLightsFlatMap.push(lightGrid[i][j])
  }
}
console.log(totalLightsFlatMap)
let total = totalLightsFlatMap.reduce((a, b) => a + b, 0)
console.log(total)
