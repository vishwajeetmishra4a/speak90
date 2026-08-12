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

            selectedTopic = topics[
                Math.floor(Math.random() * topics.length)
            ];

            shuffleBox.innerHTML = `
                <div>
                    ${selectedTopic}
                </div>
            `;

            actionButtons.classList.remove("hidden");
        }

    }, 120);

});