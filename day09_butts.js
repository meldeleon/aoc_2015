const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split("\r\n")

let uniqueCities = new Set()
let distanceMap = []

input.forEach((line) => {
  let [city1, _1, city2, _2, distance] = line.split(" ")
  uniqueCities.add(city1)
  uniqueCities.add(city2)
  distanceMap.push({ city1: city1, city2: city2, miles: parseInt(distance) })
})

const findAllRoutes = (cities) => {
  let allRoutes = []

  const buildRoute = (cities) => {
    let citiesLeft = [...cities]
    console.log(`1: ${citiesLeft}`)
    let route = []
    //base case
    if (citiesLeft.length === 0) {
      allRoutes.push(route)
    } else {
      for (let i = 0; i < citiesLeft.length; i++) {
        route.push(citiesLeft[i])
        citiesLeft.splice(i)
        console.log({ citiesLeft }, { route })
        console.log(`${i} : ${cities}`)
        buildRoute(citiesLeft)
      }
    }
  }
  return allRoutes
}
console.log(findAllRoutes([...uniqueCities]))
