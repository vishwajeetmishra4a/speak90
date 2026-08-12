// ===========================
// TOPIC BANNER
// ===========================

const topic = localStorage.getItem("selectedTopic") || "No Topic Selected";

document.getElementById("globalTopic").textContent = topic;


// ===========================
// ELEMENTS
// ===========================

const countdownSection = document.getElementById("countdownSection");
const speechSection = document.getElementById("speechSection");
const completeSection = document.getElementById("completeSection");

const countdownDisplay = document.getElementById("countdownDisplay");
const speechTimer = document.getElementById("speechTimer");

const speechStage = document.getElementById("speechStage");

const addFiveBtn = document.getElementById("addFiveBtn");

const countdownCircle =
document.getElementById("countdownCircle");

const speechCircle =
document.getElementById("speechCircle");


// ===========================
// SVG SETUP
// ===========================

const radius = 90;

const circumference =
2 * Math.PI * radius;

[countdownCircle, speechCircle]
.forEach(circle => {

    circle.style.strokeDasharray =
    circumference;

    circle.style.strokeDashoffset = 0;

});


// ===========================
// INITIAL COUNTDOWN
// ===========================

// let countdownTime = 5;
// let extraAdded = false;

// addFiveBtn.addEventListener("click", () => {

//     if(extraAdded) return;

//     countdownTime += 5;

//     extraAdded = true;

//     addFiveBtn.innerText = "✅ +5 Added";

//     addFiveBtn.disabled = true;

// });

let countdownTime = 5;

let clickCount = 0;
const clickLimit = 5;

addFiveBtn.addEventListener("click", () => {

    if(clickCount >= clickLimit){
        return;
    }

    countdownTime += 5;

    clickCount++;

    const remaining =
    clickLimit - clickCount;

    addFiveBtn.textContent =
    `+5 Seconds (${remaining} left)`;

    if(clickCount === clickLimit){

        addFiveBtn.disabled = true
        addFiveBtn.textContent =
        "Maximum Reached";
    }

});


startCountdown();

function startCountdown(){

    let maxTime =
    countdownTime;

    const interval =
    setInterval(() => {

        countdownDisplay.textContent =
        countdownTime;

        updateCircle(
            countdownCircle,
            countdownTime,
            maxTime
        );

        countdownTime--;

        if(countdownTime < 0){

            clearInterval(interval);

            countdownSection.classList.add(
                "hidden"
            );

            startSpeech();

        }

    },1000);

}


// ===========================
// SPEECH TIMER
// ===========================

function startSpeech(){

    speechSection.classList.remove(
        "hidden"
    );

    let totalTime = 90;
    let currentTime = totalTime;

    const speechInterval =
    setInterval(() => {

        speechTimer.textContent =
        currentTime;

        updateCircle(
            speechCircle,
            currentTime,
            totalTime
        );

        if(currentTime > 60){

            speechStage.textContent =
            "Origin & Introduction";

        }

        else if(currentTime > 30){

            speechStage.textContent =
            "Current State & Deep Details";

        }

        else{

            speechStage.textContent =
            "Conclusion";

        }

        currentTime--;

        if(currentTime < 0){

            clearInterval(speechInterval);

            speechSection.classList.add(
                "hidden"
            );

            completeSection.classList.remove(
                "hidden"
            );

        }

    },1000);

}


// ===========================
// PROGRESS RING
// ===========================

function updateCircle(
    circle,
    value,
    maxValue
){

    const offset =
        circumference -
        ((value / maxValue) * circumference);

    circle.style.strokeDashoffset =
        offset;

}