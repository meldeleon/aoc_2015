var md5 = require("md5")

const secret = "yzbqklnj"
let n = 0
let product = "0"

while (meetsCriteria2(product)) {
  n++
  product = md5(secret + n.toString())
  console.log(n)
  console.log(product)
}
function meetsCriteria(product) {
  if (product.match(/^00000/g)) {
    return false
  } else {
    return true
  }
}
function meetsCriteria2(product) {
  if (product.match(/^000000/g)) {
    return false
  } else {
    return true
  }
}
