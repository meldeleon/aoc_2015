const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split("\r\n")
//console.log(input)

//create graph with all distances between cities
const graph = {}
input.forEach((line) => {
  let [city, ignore1, destination, ignore2, distance] = line.split(" ")
  if (graph[city] !== undefined) {
    graph[city][destination] = distance
  } else {
    graph[city] = {
      [destination]: distance,
    }
  }
  if (graph[destination] !== undefined) {
    graph[destination][city] = distance
  } else {
    graph[destination] = {
      [city]: distance,
    }
  }
})
console.log(graph)

const visitiedCities = []

//find the first shortest route
const routePath = {
  startingCity: "",
  currentCity: "",
  shortestDistance: 0,
  numberOfCities: 0,
  distanceTraveled: 0,
  citiesVisited: [],
}
for (const city in graph) {
  routePath.numberOfCities += 1
  for (const destination in graph[city]) {
    if (routePath.shortestDistance === 0) {
      routePath.shortestDistance = graph[city][destination]
      routePath.startingCity = city
      routePath.currentCity = destination
    } else if (graph[city][destination] < routePath.shortestDistance) {
      routePath.shortestDistance = graph[city][destination]
      routePath.startingCity = city
      routePath.currentCity = destination
    }
  }
}

for (let i = 0; i < routePath.numberOfCities; i++) {
  if (i === 0) {
    routePath.citiesVisited.push(routePath.startingCity)
    routePath.citiesVisited.push(routePath.currentCity)
    routePath.distanceTraveled += parseInt(routePath.shortestDistance)
  } else {
    for (const destination in graph[routePath.startingCity]) {
      let nextStep = findShortestDestination(
        graph[routePath.startingCity][destination]
      )
      console.log(nextStep)
    }
  }
}

console.log({ routePath })
function findShortestDestination(obj) {
  let shortest = {
    destination: "",
    distance: 0,
  }
  for (const destination in obj) {
    if (shortest.distance === 0) {
      shortest.distance = obj[destination]
      shortest.destination = destination
    } else if (obj[destination] < shortest.distance) {
      shortest.distance = obj[destination]
      shortest.destination = destination
    }
  }
  return shortest
}
