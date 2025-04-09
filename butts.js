const input = "ghijklmn"
let butt_index = returnForbiddenIndex(input)
console.log(skipForbidden(input, butt_index))

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

function skipForbidden(password, forbidden_index) {
  let reset_string = ""
  for (let i = 0; i < 8 - forbidden_index; i++) {
    reset_string = reset_string.concat("a")
  }
  let next_password = password.slice(0, forbidden_index).concat(reset_string)
  return next_password
}

function returnForbiddenIndex(password) {
  const forbidden_letters = ["o", "i", "l"]
  for (let i = 0; i < password.length; i++) {
    for (let j = 0; j < forbidden_letters.length; j++) {
      if (password[i] === forbidden_letters[j]) {
        return i
      }
    }
  }
  return -1
}
