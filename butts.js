function detectNumberChar(character) {
  let parsed = parseInt(character)
  return parsed === parsed || character === "-"
}

console.log(detectNumberChar("1"))
console.log(detectNumberChar("one"))
console.log(detectNumberChar("true"))
console.log(detectNumberChar("-"))
console.log(detectNumberChar("+"))
