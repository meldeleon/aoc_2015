const a = [1, 2, 3]
const b = {
  a: 1,
  b: 2,
}
function butts(input) {
  for (item of Object.entries(input)) {
    console.log(item)
  }
}

console.log(typeof "butts" === "string")
console.log(typeof 2)
