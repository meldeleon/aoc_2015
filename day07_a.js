//define target wire 
const targetWire = "a"

//turning input into an arr
const data = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\n")




//turn input into lines with parts for executing a bitwise operation
const mappings = new Object()

//create cach so we don't have to recurse so much
const cache = new Object()

data.forEach(line => {
    let lineArr = line.split(" ")
    // console.log(lineArr)
    let parts, lineType, targetWire
   
    switch (lineArr.length) {
        //123 -> x
       case 3: 
            parts = [lineArr[0]]
            lineType = "ASSIGN"
            targetWire = lineArr[2]
        break;
        //NOT x -> h
        case 4:
            parts = [lineArr[1]]
            lineType = lineArr[0]
            targetWire = lineArr[3]
        break;
        /*
        x AND y -> d
        x OR y -> e
        x LSHIFT 2 -> f
        y RSHIFT 2 -> g*/
        default:
            parts = [lineArr[0], lineArr[2]]
            lineType = lineArr[1]
            targetWire = lineArr[4]
        break;
        }
    mappings[targetWire] =  { type: lineType, inputs: parts }

})

let solution = findWireValue(targetWire)
console.log(`The answer is ${solution}`)



// //recursive function to decide what the value of a wire
function findWireValue(wire){
    console.log(`looking for wire ${wire}`)
    //check if wire is cached
    if (cache[wire]){
        console.log(`found in cache with value of ${cache[wire]}`)
        return cache[wire]
    } else {
        //pull mapping
        let {type, inputs} = mappings[wire]
        console.log(type, inputs)
        //iterate over inputs
        let solvedInputs = inputs.map(input => {
            //if the inputs are all known values, return them in the map

            if (parseInt(input) == input) return parseInt(input)
            else {
                //check to see if value is cached
                console.log(`recursing to find ${input}`)
                return findWireValue(input) 
            }
        })
        console.log(`inputs solved: ${solvedInputs}, ${type}`)
        let value = executeBitwise(type, solvedInputs)
        cache[wire] = value
        return value
    }
}

function executeBitwise(type, inputs){
    switch(type){
        case "ASSIGN":
            return inputs[0] & 0xffff
        case "NOT":
            return ~inputs[0] & 0xffff
        case "AND":
            return (inputs[0] & inputs[1]) & 0xffff 
        case "OR":
            return (inputs[0] | inputs[1]) & 0xffff
        case "LSHIFT":
            return (inputs[0] << inputs[1]) & 0xffff
        case "RSHIFT":
            return (inputs[0] >> inputs[1]) & 0xffff
        default:
            console.error(`type not recognized for ${type} and inputs: ${inputs}`)
    }
}


