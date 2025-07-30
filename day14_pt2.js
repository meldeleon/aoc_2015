const input = require("fs")
  .readFileSync("day14_input.txt")
  .toString()
  .split("\r\n")

const reindeer = new Object()
const maxSeconds = 1000

for (let i = 0; i < input.length; i++) {
  let lineArr = input[i].split(" ")
  let deer = lineArr[0]
  if (!reindeer[deer]) {
    reindeer[deer] = new Object()
  }
  reindeer[deer].speed = parseInt(lineArr[3])
  reindeer[deer].duration = parseInt(lineArr[6])
  reindeer[deer].rest = parseInt(lineArr[13])
  reindeer[deer].points = 0
}

for (let i = 0; i < maxSeconds; i++) {
  let winningDeer = determineWinner(i)
  console.log({ winningDeer }, { i })
  reindeer[winningDeer].points += 1
}

console.log(reindeer)

//Helper functions
function calculateDeerDistance(deer, seconds) {
  let { speed, duration, rest } = reindeer[deer]
  let fullCycle = duration + rest
  //how many full cycles has the deer gone
  let cycles = Math.trunc(seconds / fullCycle)
  let distanceTraveled = cycles * speed * duration
  let remainder = seconds % fullCycle
  //console.log({ fullCycle }, { remainder })
  if (remainder > duration) {
    distanceTraveled += speed * duration
  } else {
    distanceTraveled += speed * remainder
  }
  return distanceTraveled
}

function determineWinner(i) {
  let winningDistance = 0
  let winner
  Object.keys(reindeer).forEach((deer) => {
    console.log({ deer })
    let currentDistance = calculateDeerDistance(deer, i)
    console.log({ currentDistance })
    if (currentDistance > winningDistance) {
      winningDistance = currentDistance
      winner = deer
    }
  })
  console.log({ winner })
  return winner
}
