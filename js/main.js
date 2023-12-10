function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//   function messageTest() {
//     console.log('ran after 1 second');
//   }

// function randomStrike(combinations){
function randomStrike() {
    var combinations = ['1', '1-2', '1-2-3']
    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * combinations.length);
    // Return the object at the random index
    return combinations[randomIndex];
}

function randomDelay(minDelay, maxDelay) {
    // Choose random value within delay range and multiple by 1000 to get seconds in miliseconds
    return (Math.random() * (maxDelay - minDelay) + minDelay);
}

function getFormData(formId) {
    // Choose random value within delay range and multiple by 1000 to get seconds in miliseconds
    let formData = new FormData(document.querySelector(formId));
    var object = {};
    formData.forEach(function (value, key) {
        return object[key] = value;
    });
    console.log(formId);
    console.log(object);
    return object
}
var runState
const timer = document.getElementById("timer");
const screen = document.getElementById("screen");
async function startDrill() {
    var roundParams = getFormData("#roundParams");
    var strikeParams = getFormData("#strikeParams");
    // //   Test data
    var length = roundParams.roundLength * 1000;
    var minDelay = roundParams.minDelay * 1000;
    var maxDelay = roundParams.maxDelay * 1000;
    console.log(minDelay)
    // Set state to 1
    runState = 1
    // Print 'starting...'
    screen.innerHTML = "starting...";
    // Wait 3 seconds 
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Print 'begin!'
    // Set timer from length field. After waiting, set state to 0
    // delay(length).then(() => runState = 0);
    startCountdown(length);
    screen.innerHTML = "begin!";
    await new Promise(resolve => setTimeout(resolve, 2000));
    screen.innerHTML = "...";

    while (runState === 1) {
        // choose random delay from range given
        let delay = randomDelay(minDelay, maxDelay);
        let strike = randomStrike()
        console.log('next strike is a ' + strike + ' in ' + Math.round(delay / 1000) + ' seconds')
        await new Promise(resolve => setTimeout(resolve, delay));
        // Choose random strike. 
        if (runState === 1) {
            screen.innerHTML = strike;
            await new Promise(resolve => setTimeout(resolve, 1000));
            screen.innerHTML = "...";
        }

    }

}


function startCountdown(length) {
    let seconds = length / 1000;
    let timerId;
    timer.innerHTML = seconds
    timerId = setInterval(() => {
        seconds--;
        timer.innerHTML = seconds
        if (seconds === 0) {
            clearInterval(timerId);

            runState = 0
            screen.innerHTML = 'round complete';
        }
    }, 1000);
}


// startCountdown(); // Start the countdown


// function stopCountdown() {
//     clearInterval(timerId);
//   }
// Stop the countdown after 10 seconds
// setTimeout(stopCountdown, 10000);
