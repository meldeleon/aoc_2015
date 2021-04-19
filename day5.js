const input = Array.from(
  require("fs").readFileSync("day5_input.txt").toString().split("\r\n")
)

//console.log(input)
let count = 0
input.forEach((str) => {
  console.log(str)
  // no bad boys
  if (containsBadBoy(str)) {
    console.log("contained a bad boy")
    return
  } else {
    if (checkForDouble(str) && containsVowels(str)) {
      console.log("incremented count")
      count++
    } else {
      return
    }
  }
})
console.log(count)

function containsBadBoy(str) {
  let regEx = new RegExp(/ab|cd|pq|xy/g)
  return regEx.test(str)
}
function checkForDouble(str) {
  let strArray = Array.from(str)
  //console.log(strArray)
  let doubleCount = 0
  strArray.forEach((letter, index) => {
    if (letter === strArray[index + 1]) {
      //console.log(letter, strArray[index + 1])
      doubleCount++
    } else {
      return
    }
  })
  if (doubleCount > 0) {
    return true
  } else {
    return false
  }
}

function containsVowels(str) {
  let vowelArray = str.match(/a|e|i|o|u/g)
  if (vowelArray != null && vowelArray.length >= 3) {
    return true
  } else {
    return false
  }
}
