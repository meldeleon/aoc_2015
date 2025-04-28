const input = "vzbxxyzz"
const alpha = "abcdefghijklmnopqrstuvwxyz"

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
console.log(incrementPassword(input))
