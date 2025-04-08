const input = "abcdefgh"
const alpha = "abcdefghijklmnopqrstuvwxyz"

console.log(findValidPassword(input))

function findValidPassword(password) {
  let unverified = true
  let stop = 0
  while (unverified) {
    password = iteratePassword(password)
    let check = validatePassword(password)
    console.log({ password }, {})
    if (check) {
      unverified = false
      return password
    }
    stop++

    if (stop > 100) {
      console.log({ stop })
      unverified = false
    }
  }
}

function iteratePassword(input) {
  const last_index = input.length - 1
  const output_arr = []
  let wraparound = false
  // start with rightmost letter of pw
  for (let i = last_index; i >= 0; i--) {
    //find what number letter in the alphabet the current letter is on
    let alphaIndex = alpha.indexOf(input[i])

    //check if this letter will carry over on increment
    if (alphaIndex > 24) {
      wraparound = true
    }
    // if its the last letter of pw, or the previous letter carried over increment the letter
    if (i === last_index) {
      output_arr.unshift(alpha[(alphaIndex + 1) % 26])
    } else if (wraparound) {
      output_arr.unshift(alpha[(alphaIndex + 1) % 26])
      wraparound = false
    }
    // otherwise, unshift as is
    else {
      output_arr.unshift(input[i])
      wraparound = false
    }
  }
  return output_arr.join("")
}

function validatePassword(password) {
  let checkStraight = increasingStraight(password)
  let checkForExcludes = excludeLetters(password)
  let checkForOverlaps = twoOverlapping(password)
  //console.log({ checkStraight }, { checkForExcludes }, { checkForOverlaps })
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
