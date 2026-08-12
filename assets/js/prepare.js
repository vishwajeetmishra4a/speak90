const topicTitle =
document.getElementById("topicTitle");

const topic =
localStorage.getItem("selectedTopic");

topicTitle.textContent =
`Topic: ${topic}`;


const timeButtons =
document.querySelectorAll(".time-btn");

let selectedTime = 1;

timeButtons.forEach(button => {

    button.addEventListener("click", () => {

        timeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedTime =
        Number(
            button.dataset.time
        );

    });

});