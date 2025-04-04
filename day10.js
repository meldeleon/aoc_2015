const input_str = "1113122113"
const loops = 40

//parse int + array transformation
const input_arr = []
for (let g = 0; g < input_str.length; g++) {
  input_arr.push(parseInt(input_str[g]))
}

console.log(`the result is: ${lookSay(input_arr, loops).length}`)

function lookSay(input_arr, loops) {
  for (let h = 0; h < loops; h++) {
    let count = 1
    const output_arr = []
    for (let i = 0; i < input_arr.length; i++) {
      //look at the current number
      let current_number = input_arr[i]
      let next_number = input_arr[i + 1]
      //check if the next number matches
      if (current_number === next_number) {
        count++
      } else {
        output_arr.push(count, current_number)
        count = 1
      }
    }
    //console.log(output_arr)
    input_arr = output_arr
  }
  return input_arr
}
