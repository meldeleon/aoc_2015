//bitwise AND

function bitwiseAnd(arr1, arr2) {
  let y = arr2[index]
  return arr1.map((x, index) => {
    return x * y
  })
}

//bitwise OR
function bitwiseOr(arr1, arr2) {
  return arr1.map((x, index) => {
    let y = arr2[index]
    if (x === 1 || y === 1) {
      return 1
    } else {
      return 0
    }
  })
}

//rshift
function bitwiseRShift(arr, shiftNumber) {
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.unshift(0)
    shiftedArr.pop()
  }
  return shiftedArr
}

//lshift
function bitwiseLShift(arr, shiftNumber) {
  let shiftedArr = [...arr]
  for (let i = 0; i < shiftNumber; i++) {
    shiftedArr.push(0)
    shiftedArr.shift()
  }
  return shiftedArr
}

//complement (NOT)
function bitwiseComplement(arr) {
  return arr.map((x) => {
    return 1 - x
  })
}
let test = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
console.log(bitwiseComplement(test))

function intTo16Bit(int) {
  let bitArray = []
  for (i = 0; i < 16; i++) {
    let power = 2 ** (15 - i)
    if (int / power >= 1) {
      bitArray[i] = 1
    } else {
      bitArray[i] = 0
    }
    int = int % power
  }
}
