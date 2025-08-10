const sueRoster = require("fs")
  .readFileSync("day16_input.txt")
  .toString()
  .split("\r\n")
  .map((line) => {
    let splitByWhiteSpace = line.split(" ")
    let splitByCommas = line.splt(",")
    return {
      number: parseInt(splitByWhiteSpace[1]),
    }
  })
console.log(sueRoster)
