const input = "vzcaabcc"
const alpha = "abcdefghijklmnopqrstuvwxyz"
const forbidden = new Set(["i", "o", "l"])

function incrementPassword(password) {
  const chars = password.split("")
  let i = chars.length - 1
  while (i >= 0) {
    let alphaIndex = alpha.indexOf(chars[i])
    alphaIndex = (alphaIndex + 1) % 26
    chars[i] = alpha[alphaIndex]
    if (alphaIndex !== 0) break
    i--
  }
  return chars.join("")
}
function hasStraight(password) {
  for (let i = 0; i < password.length - 2; i++) {
    const a = password.charCodeAt(i)
    const b = password.charCodeAt(i + 1)
    const c = password.charCodeAt(i + 2)
    if (b === a + 1 && c === b + 1) return true
  }
  return false
}

function hasForbidden(password) {
  return [...password].some((char) => forbidden.has(char))
}

function hasTwoPairs(password) {
  let pairs = new Set()
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs.add(password[i])
      i++ // skip next to prevent overlapping
    }
  }
  return pairs.size >= 2
}

function findNextValidPassword(password) {
  let next = incrementPassword(password)
  while (true) {
    if (!hasForbidden(next) && hasStraight(next) && hasTwoPairs(next)) {
      return next
    }
    next = incrementPassword(next)
  }
}

const nextValidPassword = findNextValidPassword(input)
console.log(nextValidPassword)
