let butts = [ '""', '"abc"', '"aaa\\"aaa"', '"\\x27"' ]

butts.forEach(str => {
    escape(str)
})

let test = '""'

console.log(escape(test))

function escape(str) {
    str = str.replace("\\", "\\\\")
    str = str.replace('"', '\\"')
    return str
}