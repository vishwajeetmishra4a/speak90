const topic =
localStorage.getItem("selectedTopic");

// document.getElementById("topicTitle").textContent =
// `Topic: ${topic}`;

document.getElementById("globalTopic").textContent =
topic;

let selectedTime = 1;

document.querySelectorAll(".time-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelectorAll(".time-btn")
        .forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        selectedTime =
        Number(btn.dataset.time);

    });

});

const prepareSection =
document.getElementById("prepareSection");

const timerSection =
document.getElementById("timerSection");

const countdownSection =
document.getElementById("countdownSection");

const speechSection =
document.getElementById("speechSection");

const completeSection =
document.getElementById("completeSection");

const prepCircle =
document.getElementById("prepCircle");

const countdownCircle =
document.getElementById("countdownCircle");

const speechCircle =
document.getElementById("speechCircle");

const prepTimerDisplay =
document.getElementById("prepTimerDisplay");

const countdownDisplay =
document.getElementById("countdownDisplay");

const speechTimer =
document.getElementById("speechTimer");

const speechTopic =
document.getElementById("speechTopic");

const speechStage =
document.getElementById("speechStage");

const radius = 90;
const circumference =
2 * Math.PI * radius;

[
    prepCircle,
    countdownCircle,
    speechCircle
].forEach(circle => {

    circle.style.strokeDasharray =
    circumference;

});

let prepInterval;

document
.getElementById("startPrepBtn")
.addEventListener("click", () => {

    prepareSection.classList.add("hidden");

    timerSection.classList.remove("hidden");

    startPreparation();

});


document
.getElementById("speakNowBtn")
.addEventListener("click", () => {

    clearInterval(prepInterval);

    timerSection.classList.add("hidden");

    startCountdown(5);

});

function startPreparation(){

    let total =
    selectedTime * 60;

    let current =
    total;

    prepInterval =
    setInterval(() => {

        let minutes =
        Math.floor(current / 60);

        let seconds =
        current % 60;

        prepTimerDisplay.textContent =
        `${minutes}:${String(seconds).padStart(2,'0')}`;

        updateCircle(
            prepCircle,
            current,
            total
        );

        current--;

        if(current < 0){

            clearInterval(prepInterval);

            timerSection.classList.add("hidden");

            startCountdown(10);
        }

    },1000);
}

function startCountdown(seconds){

    countdownSection.classList.remove("hidden");

    countdownDisplay.textContent =
    seconds;

    let current =
    seconds;

    const interval =
    setInterval(() => {

        countdownDisplay.textContent =
        current;

        updateCircle(
            countdownCircle,
            current,
            seconds
        );

        current--;

        if(current < 0){

            clearInterval(interval);

            countdownSection.classList.add("hidden");

            startSpeech();
        }

    },1000);
}

function startSpeech(){

    speechSection.classList.remove("hidden");

    speechTopic.textContent = topic;

    let total = 90;
    let current = total;

    const interval =
    setInterval(() => {

        speechTimer.textContent =
        current;

        updateCircle(
            speechCircle,
            current,
            total
        );

        if(current > 60){

            speechStage.textContent =
            "Origin & Introduction";

        }else if(current > 30){

            speechStage.textContent =
            "Current State & Deep Details";

        }else{

            speechStage.textContent =
            "Conclusion";
        }

        current--;

        if(current < 0){

            clearInterval(interval);

            speechSection.classList.add("hidden");

            completeSection.classList.remove("hidden");
        }

    },1000);
}

function updateCircle(
    circle,
    value,
    maxValue
){

    const offset =
    circumference -
    (value / maxValue)
    * circumference;

    circle.style.strokeDashoffset =
    offset;
}
