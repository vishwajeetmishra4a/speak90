const findTopicBtn = document.getElementById("findTopicBtn");

const shuffleBox = document.getElementById("shuffleBox");

const actionButtons = document.getElementById("actionButtons");

let selectedTopic = "";

findTopicBtn.addEventListener("click", () => {

    let count = 0;

    actionButtons.classList.add("hidden");

    const shuffleInterval = setInterval(() => {

        const randomIndex = Math.floor(
            Math.random() * topics.length
        );

        shuffleBox.textContent = topics[randomIndex];

        count++;

        if (count >= 25) {

            clearInterval(shuffleInterval);

            // selectedTopic = topics[
            //     Math.floor(Math.random() * topics.length)
            // ];
            selectedTopic =topics[
                Math.floor(
                    Math.random() * topics.length)
                
            ];

            localStorage.setItem(
                "selectedTopic",
                selectedTopic
            );

            shuffleBox.innerHTML = `
                <div>
                    ${selectedTopic}
                </div>
            `;

            actionButtons.classList.remove("hidden");
        }

    }, 120);

});


const prepareBtn = document.getElementById("prepareBtn");
const speakBtn = document.getElementById("speakBtn");

const prepareSection =
document.getElementById("prepareSection");

const timerSection =
document.getElementById("timerSection");

const speechSection =
document.getElementById("speechSection");

const completeSection =
document.getElementById("completeSection");

const startPrepBtn =
document.getElementById("startPrepBtn");

const prepTimeSelect =
document.getElementById("prepTimeSelect");

const timerDisplay =
document.getElementById("timerDisplay");

const speechTimer =
document.getElementById("speechTimer");

const speechTopic =
document.getElementById("speechTopic");

const speechStage =
document.getElementById("speechStage");

const progressCircle =
document.getElementById("progressCircle");

const speechCircle =
document.getElementById("speechCircle");

const speakNowBtn =
document.getElementById("speakNowBtn");

const radius = 90;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
speechCircle.style.strokeDasharray = circumference;

// prepareBtn.addEventListener("click", () => {

//     prepareSection.classList.remove("hidden");

// });

prepareBtn.addEventListener("click", () => {

    window.location.href = "./assets/pages/prepare.html";

});



startPrepBtn.addEventListener("click", () => {

    prepareSection.classList.add("hidden");

    startPreparation();

});

speakBtn.addEventListener("click", () => {

    startCountdown(5);

});

speakBtn.addEventListener("click", () => {

    localStorage.setItem(
        "selectedTopic",
        selectedTopic
    );

    window.location.href =
    "./assets/pages/speak.html";

});

speakNowBtn.addEventListener("click", () => {

    startSpeech();

});

function startPreparation(){

    timerSection.classList.remove("hidden");

    // let totalSeconds =
    // parseInt(prepTimeSelect.value) * 60;

    let totalSeconds=selectedTime * 60

    let current = totalSeconds;

    const interval = setInterval(()=>{

        let minutes = Math.floor(current / 60);
        let seconds = current % 60;

        timerDisplay.textContent =
        `${minutes}:${seconds.toString().padStart(2,"0")}`;

        updateCircle(
            progressCircle,
            current,
            totalSeconds
        );

        current--;

        if(current < 0){

            clearInterval(interval);

            startCountdown(10);

        }

    },1000);
}

function startCountdown(seconds){

    let current = seconds;

    const interval = setInterval(()=>{

        timerDisplay.textContent =
        current;

        updateCircle(
            progressCircle,
            current,
            seconds
        );

        current--;

        if(current < 0){

            clearInterval(interval);

            timerSection.classList.add("hidden");

            startSpeech();

        }

    },1000);

}

function startSpeech(){

    speechSection.classList.remove("hidden");

    speechTopic.textContent = selectedTopic;

    let total = 90;
    let current = total;

    const interval = setInterval(()=>{

        speechTimer.textContent = current;

        updateCircle(
            speechCircle,
            current,
            total
        );

        if(current > 60){
            speechStage.textContent =
            "Origin & Introduction";
        }
        else if(current > 30){
            speechStage.textContent =
            "Current State & Deep Details";
        }
        else{
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

function updateCircle(circle, value, maxValue){

    const offset =
    circumference -
    (value/maxValue) * circumference;

    circle.style.strokeDashoffset =
    offset;
}