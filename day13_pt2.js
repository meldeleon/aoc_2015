const input = require("fs")
  .readFileSync("day13_pt_2_input.txt")
  .toString()
  .split("\r\n")

//MAIN
const seatingMap = new Object()
input.forEach((line) => {
  addValuesToSeatMap(line)
})
const seatingArr = Object.keys(seatingMap)
const allPermutations = permutes(seatingArr)
let maxHappiness = 0
for (let i = 0; i < allPermutations.length; i++) {
  let currentPermutation = allPermutations[i]
  let currentHappiness = calculateHappiness(currentPermutation)
  if (currentHappiness > maxHappiness) maxHappiness = currentHappiness
}
console.log({ maxHappiness })

//helper functions

function addValuesToSeatMap(line) {
  // split the line, assign vars to important bits
  let lineArr = line.split(" ")
  let person = lineArr[0]
  //check if happiness is gained or lost
  let isNegative = false
  if (lineArr[2] === "lose") {
    isNegative = true
  }
  let num = parseInt(lineArr[3])
  let neighbor = lineArr[lineArr.length - 1].replace(".", "")

  //if object does not exist in seatingMap yet, create it
  if (!seatingMap[person]) {
    seatingMap[person] = new Object()
  }
  //assign neighbors to people in seating maps
  if (isNegative) {
    seatingMap[person][neighbor] = -num
  } else {
    seatingMap[person][neighbor] = num
  }
}

function permutes(seatingArr) {
  const permutations = []
  //base case; once we reach the end of the possible subpermutations return
  if (seatingArr.length === 0) {
    permutations.push([])
    return permutations
  }
  //iterate over the initial list
  for (let i = 0; i < seatingArr.length; i++) {
    //grab the current iteration of person
    const currentPerson = seatingArr[i]
    //grab everyone else in the people set
    const remainingPeople = seatingArr
      .slice(0, i)
      .concat(seatingArr.slice(i + 1, seatingArr.length))
    // finding the permutations for everyone remaining in the set
    const subPermutations = permutes(remainingPeople)
    // iterate over those subpermutations, and push those to our permutations list.
    for (let subPermutation of subPermutations) {
      permutations.push([currentPerson].concat(subPermutation))
    }
  }
  return permutations
}

function calculateHappiness(permutation) {
  //iterate over each person, see who their neighbors are and then calculate each persons happinees and add it to the total
  let totalHappiness = 0
  for (let i = 0; i < permutation.length; i++) {
    let person = permutation[i]
    let leftNeighbor
    if (i === 0) {
      leftNeighbor = permutation[permutation.length - 1]
    } else {
      leftNeighbor = permutation[i - 1]
    }
    let rightNeighbor = permutation[(i + 1) % permutation.length]
    totalHappiness += seatingMap[person][leftNeighbor]
    totalHappiness += seatingMap[person][rightNeighbor]
  }
  return totalHappiness
}
