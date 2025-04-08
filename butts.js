var input = "abcdffaa"
const alpha = "abcdefghijklmnopqrstuvwxyz"

console.log(validatePassword(input))

function validatePassword(password) {
  let checkStraight = increasingStraight(password)
  let checkForExcludes = excludeLetters(password)
  let checkForOverlaps = twoOverlapping(password)
  console.log({ checkStraight }, { checkForExcludes }, { checkForOverlaps })
  return checkStraight && checkForExcludes && checkForOverlaps
}

//expects a string of
function increasingStraight(password) {
  for (let i = 0; i < password.length - 2; i++) {
    let index1 = alpha.indexOf(password[i])
    let index2 = alpha.indexOf(password[i + 1])
    let index3 = alpha.indexOf(password[i + 2])
    if (index2 === index1 + 1 && index3 === index2 + 1) {
      return true
    }
  }
  return false
}

function excludeLetters(password) {
  let count =
    password.indexOf("o") + password.indexOf("i") + password.indexOf("l")
  return count <= -3
}

function twoOverlapping(password) {
  let count = 0
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      count++
      i++
    }
  }
  return count >= 2
}
