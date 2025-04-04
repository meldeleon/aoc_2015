const input = "vzbxkghb"
const alpha = "abcdefghijklmnopqrstuvwxyz"

function iteratePassword(input) {
  const last_index = input.length - 1
  const output_arr = []
  let increment_next = false
  for (let i = last_index; i >= 0; i--) {
    let alphaIndex = alpha.indexOf(input[i])
    //check if this letter will carry over
    if (alphaIndex > 24) {
      increment_next = true
    }
    // if its the last letter of pw, or previous letter carried over increment
    if (i === last_index || increment_next) {
      output_arr.unshift(alpha[(alphaIndex + 1) % 26])
    }
    // otherwise, unshift as it
    else {
      output_arr.unshift(input[i])
      increment_next = false
    }
  }
  return output_arr.join("")
}

function validatePassword(password) {
  return (
    increasingStraight(password) &&
    excludeLetters(password) &&
    twoOverlapping(password)
  )
}

console.log(validatePassword("abcdffaa"))

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
  console.log(count)
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
