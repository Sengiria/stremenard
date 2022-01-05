const stats = {boredom: 10, hunger: 10, thirst: 10, natureCalls: 11, sleepiness: 10}
const newValue = {}

Object.entries(stats).map(([k, v]) => {
    if(v > 10)
    newValue[k] = v
})
console.log(newValue)
