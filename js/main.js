// Utilities for the drill app
function randomStrike(strikeList) {
  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * strikeList.length);
  // Return the object at the random index
  return strikeList[randomIndex];
}
function randomDelay(minDelay, maxDelay) {
  // Choose random value within delay range and multiple by 1000 to get seconds in miliseconds
  return Math.random() * (maxDelay - minDelay) + minDelay;
}
function getFormData(formId) {
  // Choose random value within delay range and multiple by 1000 to get seconds in miliseconds
  let formData = new FormData(document.querySelector(formId));
  var object = {};
  formData.forEach(function (value, key) {
    return (object[key] = value);
  });
  console.log(formId);
  console.log(object);
  return object;
}

function groupByNumber(obj) {
    const result = [];
    for (let key in obj) {
        const match = key.match(/(\D+)(\d+)/);
        if (match) {
            const [, prefix, index] = match;
            if (!result[index]) {
                result[index] = {};
            }
            result[index][prefix] = obj[key];
        }
    }
    console.log(result);
    return result;
}

var runState;
const timer = document.getElementById("timer");
const screen = document.getElementById("screen");
async function startDrill() {
    var roundParams = getFormData("#drillParams");
    var strikeParams = groupByNumber(getFormData("#strikeList"));
    // //   Test data
  var length = roundParams.roundLength * 1000;
  var minDelay = roundParams.minDelay * 1000;
  var maxDelay = roundParams.maxDelay * 1000;
  console.log(minDelay);
  // Set state to 1
  runState = 1;
  screen.innerHTML = "starting...";
  // Wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Print 'begin!'
  // Set timer from length field. After waiting, set state to 0
  startCountdown(length);
  screen.innerHTML = "begin!";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  screen.innerHTML = "...";

  while (runState === 1) {
    // choose random delay from range given
    let delay = randomDelay(minDelay, maxDelay);
    let strike = randomStrike(strikeParams);
    let strikeName= strike.strike;
    console.log(
      "next strike is a " +
      strikeName +
        " in " +
        (delay / 1000).toFixed(2) +
        " seconds"
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    // Choose random strike.
    if (runState === 1) {
      screen.innerHTML = strikeName;
      screen.style.backgroundColor= strike.color;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      screen.style.backgroundColor= "#ffffff";
      screen.innerHTML = "...";
    }
  }
}

function startCountdown(length) {
  let seconds = length / 1000;
  let timerId;
  timer.innerHTML = seconds;
  timerId = setInterval(() => {
    seconds--;
    timer.innerHTML = seconds;
    if (seconds === 0) {
      clearInterval(timerId);

      runState = 0;
      screen.innerHTML = "round complete";
    }
  }, 1000);
}

function createInput(name, label, value, id, type = "text") {
  var input = $("<input>")
    .attr({
      type: type,
      name: name,
      value: value,
    })
    .addClass("form-control form-control-sm")
    .attr("id", `${name}_${id}`);
  var col = $("<div>")
    .addClass("col-md-3")
    .append(
      $("<div>")
        .addClass("form-floating")
        .append(input, $("<label>").attr("for", `${name}_${id}`).text(label))
    );
  return col;
}

function createDropdown(name, label, options, id) {
  var select = $("<select>")
    .attr({
      name: name,
      id: `${name}_${id}`,
    })
    .addClass("form-control form-control-sm");
  options.forEach((option) => {
    var optionElement = $("<option>")
      .attr({
        value: option.value,
      })
      .text(option.text);
    select.append(optionElement);
  });
  var col = $("<div>")
    .addClass("col-md-3")
    .append(
      $("<div>")
        .addClass("form-floating")
        .append(select, $("<label>").attr("for", `${name}_${id}`).text(label))
    );
  return col;
}

function addStrike() {
  var id = $(".strikeRow").length;
  var row = $("<div>")
    .addClass("row mb-3 strikeRow")
    .append(
      createInput("strike_"+id, "Strike", "", id, "text"),
      createInput("duration_"+id, "Duration", 1, id, "number"),
      createDropdown(
        "color_"+id,
        "Color",
        [
          { value: "#cc0000", text: "Red" },
          { value: "#ff9933", text: "Orange" },
          { value: "#0099ff", text: "Blue" },
          { value: "#ff00ff", text: "Pink" },
          { value: "#33cc33", text: "Green" }
        ],
        id
      ),
      createDropdown(
        "sound_"+id,
        "Sound",
        [
          {
            value: "https://www.soundjay.com/buttons/beep-07a.mp3",
            text: "Beep1",
          },
        ],
        id
      )
    );
  $("#strikeList").append(row);
}
