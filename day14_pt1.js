const input = require("fs")
  .readFileSync("day14_input.txt")
  .toString()
  .split("\r\n")

const reindeer = new Object()
const seconds = 2503

for (let i = 0; i < input.length; i++) {
  let lineArr = input[i].split(" ")
  let deer = lineArr[0]
  if (!reindeer[deer]) {
    reindeer[deer] = new Object()
  }
  reindeer[deer].speed = parseInt(lineArr[3])
  reindeer[deer].duration = parseInt(lineArr[6])
  reindeer[deer].rest = parseInt(lineArr[13])
}
let maxDistance = 0
console.log(reindeer)
const distances = Object.keys(reindeer).map((deer) => {
  let distance = calculateDeerDistance(deer, seconds)
  if (distance > maxDistance) maxDistance = distance
  return [deer, distance]
})

console.log({ maxDistance })

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
