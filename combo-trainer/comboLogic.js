function getRandomValues(array,numValues){
    let randomElements = [];
    for (let i = 0; i < numValues; i++) {
        let randomElement = array[Math.floor(Math.random() * array.length)];
        randomElements.push(randomElement)
      }
    return randomElements
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

let punchRange = [...Array(5).keys()]
punchRange.shift();
// console.log(punchRange)
console.log(getRandomValues(punchRange,5))
sleep(500);
console.log(getRandomValues(punchRange,2))