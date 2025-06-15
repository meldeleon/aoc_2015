//define target wire here
const promptWire = "f"
//turning input into an arr
const data = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\n")

const targetWire = "a"

//turn input into lines with parts for executing a bitwise operation
const mappings = new Object()

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

// console.log(mappings)
let solution = findWireValue(targetWire)
console.log(`The answer is ${solution}`)



// //recursive function to decide what the value of a wire
function findWireValue(wire){
    //pull mapping
    let {type, inputs} = mappings[wire]
    console.log(type, inputs)
    //iterate over inputs
    let solvedInputs = inputs.map(input => {
        //if the inputs are all known values, return them in the map
        if (parseInt(input) == input) return parseInt(input)
        //in there
        else {
            console.log(`recursing to find ${input}`)
            return findWireValue(input) 
        }
    })
    return executeBitwise(type, solvedInputs)
    
}

function executeBitwise(type, inputs){
    switch(type){
        case "ASSIGN":
            return inputs[0]
        case "NOT":
            return ~inputs[0] & 0xffff
        case "AND":
            return (inputs[0] && inputs[1]) & 0xffff 
        case "OR":
            return (inputs[0] || inputs[1]) & 0xffff
        case "LSHIFT":
            return (inputs[0] << inputs[1]) & 0xffff
        case "RSHIFT":
            return (inputs[0] >> inputs[1]) & 0xffff
        default:
            console.error(`type not recognized for ${type} and inputs: ${inputs}`)
    }
}


