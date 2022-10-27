const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split("\n")
//console.log(input)

//create graph with all distances between cities
const graph = {}
input.forEach( line => {
    let [city, ignore1, destination, ignore2, distance] = line.split(" ")
    if (graph[city] !== undefined) {
        graph[city][destination] = distance
    } else {
        graph[city] = {
            [destination]: distance
        }
    }
    if (graph[destination] !== undefined){
        graph[destination][city] = distance
    } else {
        graph[destination] = {
            [city]: distance
        }

    }
});
console.log(graph)


const visitiedCities = []
