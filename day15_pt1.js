const numberOfTeaspoons = 100
// Function 0: Parse the input
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

const combinations = createCombinations(ingredients.length, numberOfTeaspoons)

console.log(returnScore([44, 56], ingredients))
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

function returnScore(combination, ingredients) {
  const totals = {
    capacity: [],
    durability: [],
    flavor: [],
    texture: [],
  }
  if (combination.length === ingredients.length) {
    for (let i = 0; i < combination.length; i++) {
      ingredients[i].amount = combination[i]
    }

    ingredients.forEach((ingredient) => {
      totals.capacity.push(ingredient.capacity * ingredient.amount)
      totals.durability.push(ingredient.durability * ingredient.amount)
      totals.flavor.push(ingredient.flavor * ingredient.amount)
      totals.texture.push(ingredient.texture * ingredient.amount)
    })
  } else {
    console.error("combination and ingredients do not match")
  }
  let score = 1
  for (attribute in totals) {
    console.log({ totals[attribute] })
    let sumAttribute = sumArr(totals[attribute])
    if (sumAttribute < 0) return 0
    else score *= sumAttribute
  }
}

function sumArr(arr) {
  return arr.reduce((a, b) => a + b, 0)
}
