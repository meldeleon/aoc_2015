const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split("\r\n")

//store the distances in an array
const cities = []
const distances = input.map((line) => {
  let [city1, _to, city2, _equals, miles] = line.split(" ")
  cities.push(city1, city2)
  return {
    cities: [city1, city2],
    distance: miles,
  }
})
//console.log(distances)

function findDistance(city1, city2) {
  for (let i = 0; i < distances.length; i++) {
    let leg = distances[i]
    if (leg.cities.includes(city1) && leg.cities.includes(city2)) {
      return leg.distance
    }
  }
}

//dedupe cities
const unique_cities = [...new Set(cities)]

//permutation thing to get a list of all routes
function findPermutations(cities_list) {
  //base case
  if (cities_list.length === 0) {
    return [[]]
  }
  //storing result
  const result = []
  //iterate over cities
  for (let i = 0; i < cities_list.length; i++) {
    //grab current list item
    const current_list = cities_list[i]
    const remaining_list = cities_list
      .slice(0, i)
      .concat(cities_list.slice(i + 1))
    const permutations = findPermutations(remaining_list)
    for (let permutation of permutations) {
      result.push([current_list, ...permutation])
    }
  }
  return result
}
const all_routes = findPermutations(unique_cities)
var max_distance = 0
const all_routes_with_distance = all_routes.map((route) => {
  let distance = 0
  for (let i = 0; i < route.length - 1; i++) {
    distance += parseInt(findDistance(route[i], route[i + 1]))
  }
  if (distance > max_distance) max_distance = distance
  return {
    route: route,
    distance: distance,
  }
})

console.log(`The answer is: ${max_distance}`)
