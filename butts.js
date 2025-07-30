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

console.log(createCombinations(3, 15))
