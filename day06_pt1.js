const input = require("fs")
  .readFileSync("day6_input.txt")
  .toString()
  .split("\r\n")

const lightGrid = []
for (let i = 0; i < 999; i++) {
  lightGrid[i] = []
  for (j = 0; j < 999; j++) {
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
  let iMax = instruction[2][0]
  let jMin = instruction[1][1]
  let jMax = instruction[2][1]
  for (i = iMin; i <= iMax; i++) {
    for (j = jMin; j <= jMax; j++) {
      if ((state === 0) | (state === 1)) {
        lightGrid[i][j] = state
      } else {
        lightGrid[i][j] = 1 - lightGrid[i][j]
      }
    }
  }
}

input.forEach((x) => {
  executeInstruction(instruction(x))
})

let totalLights = 0
for (i = 0; i < lightGrid.length; i++) {
  for (j = 0; j < lightGrid[i].length; j++) {
    if (lightGrid[i][j] === 1) {
      totalLights++
    } else {
    }
  }
}
console.log(totalLights)
