const input = require("fs")
  .readFileSync("day08_input.txt")
  .toString()
  .split("\n")
//console.log(input)


const state = {
    literalCharCount: 0,
    stringCharCount: 0,
}

input.forEach(str => {
    state.literalCharCount += literalCount(str)
    state.stringCharCount += strCount(str)
})
function literalCount (str) {
    return str.length
}

function strCount(str) {
    let count = 0
    for (let i = 0; i < str.length; i ++) {
        if (str[i] === "\\") {
            count ++
            let nextChar = str[i+1]
            if (nextChar === "\\"){
                i++
            } else if (nextChar === "x") {
                i+=3
            }
        }
        else if (str[i] === '"') {
            //do nothing
        } else {
            count++
        }
    }
    return count
}
console.log({state})

console.log(`The answer is ${state.literalCharCount - state.stringCharCount}`)
