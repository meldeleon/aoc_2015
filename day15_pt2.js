const numberOfTeaspoons = 100
// Parse the input, create a list of ingredients
const ingredients = require("fs")
  .readFileSync("day15_input.txt")
  .toString()
  .split("\r\n")
  .map((line) => {
    let [
      name,
      _ignore1,
      capacity,
      _ignore2,
      durability,
      _ignore3,
      flavor,
      _ignore4,
      texture,
      _ignore5,
      calories,
    ] = line.split(" ")
    return {
      ingredient: name.replace(":", ""),
      capacity: parseInt(capacity),
      durability: parseInt(durability),
      flavor: parseInt(flavor),
      texture: parseInt(texture),
      calories: parseInt(calories),
    }
  })

//program starts here
const combinations = createCombinations(ingredients.length, numberOfTeaspoons)
let maxScore = { amount: 0, combination: [] }
combinations.forEach((combination) => {
  let [currentScore, calories] = returnScore(combination, ingredients)
  //console.log({ currentScore }, { calories })
  if (calories === 500 && currentScore > maxScore.amount) {
    maxScore.amount = currentScore
    maxScore.combination = combination
  }
})

console.log({ maxScore })
// HELPER FUNCTIONS
// Function 1: find all derivations of ingredients totalling 100
// output an array of ingredients list
function createCombinations(items, total) {
  let results = []
  function buildCombination(currentCombination) {
    let itemsLeft = items - currentCombination.length
    let sum = currentCombination.reduce((a, b) => a + b, 0)
    let remainder = total - sum
    //base case is how many items are left, if 1, then we're done
    if (itemsLeft === 1) {
      let finalCombination = []
      currentCombination.forEach((x) => finalCombination.push(x))
      finalCombination.push(remainder)
      results.push(finalCombination)
      return
    } else {
      for (let i = 1; i < remainder; i++) {
        let newCombination = []
        currentCombination.forEach((x) => newCombination.push(x))
        newCombination.push(i)
        buildCombination(newCombination)
      }
    }
  }
  buildCombination([])
  return results
}

//Function 2: Given a combination and ingredients return the score of the cookie
function returnScore(combination, ingredients) {
  const totals = {
    capacity: [],
    durability: [],
    flavor: [],
    texture: [],
    calories: [],
  }

  ingredients.forEach((ingredients, index) => {
    currentIngredients = { ...ingredients }
    currentIngredients.amount = combination[index]
    let { capacity, durability, flavor, texture, calories, amount } =
      currentIngredients
    totals.capacity.push(capacity * amount)
    totals.durability.push(durability * amount)
    totals.flavor.push(flavor * amount)
    totals.texture.push(texture * amount)
    totals.calories.push(calories * amount)
  })
  //console.log(totals)
  let score = 1
  let calories = 0
  for (attribute in totals) {
    let currentAttributeScore = sumArr(totals[attribute])
    if (attribute === "calories") {
      calories = currentAttributeScore
    } else if (currentAttributeScore > 0) {
      score *= sumArr(totals[attribute])
    } else {
      score = 0
    }
  }
  return [score, calories]
}

function sumArr(arr) {
  return arr.reduce((a, b) => a + b, 0)
}
