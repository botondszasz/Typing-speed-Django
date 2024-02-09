const RANDOM_TEXT_URL = "https://api.quotable.io/random";
const texDisplayElement = document.getElementById("textDisplay");
const textInputElement = document.getElementById("textInput");
const countdownElement = document.getElementById("countdown");
const scoreElement = document.getElementById("score");

let index = 0;
let mistakes = 0;
let fullWord = true;
let mistake = false;

textInputElement.addEventListener("input", () => {
    const arrayText = texDisplayElement.querySelectorAll("span");
    const inputTextValue = textInputElement.value.split("")[index];
    if (inputTextValue == null) {
        --index;
        if (arrayText[index].classList.contains("text-danger")) {
            mistake = true;
            if (mistakes != 0) {
                --mistakes;
            }
        }
        if (arrayText[index].innerText == " ") {
            fullWord = true;
        }
        if (arrayText[index - 1].innerText == " " && fullWord == true) {
            if (mistake == false) {
                --countScore;
                scoreElement.innerText = countScore;
            }
            mistake = false;
            fullWord = false;
        }
        arrayText[index].classList.remove("text-danger", "text-success");
    } else {
        if (arrayText[index].innerText === inputTextValue) {
            arrayText[index].classList.add("text-success");
            fullWord = false;
        } else {
            arrayText[index].classList.add("text-danger");
            ++mistakes;
            fullWord = false;
        }

        if (arrayText[index].innerText == " ") {
            fullWord = true;
        }

        if (mistakes == 0 && index < arrayText.length - 1 && fullWord == true) {
            increaseScore();
        }

        if (arrayText[index].innerText == " ") {
            mistakes = 0;
        }
        if (index == arrayText.length - 1) {
            if (mistakes == 0) {
                increaseScore();
            }
            index = 0;
            renderNextRandomText();
        } else {
            ++index;
        }
    }
    arrayText.forEach((span) => {
        if (span.classList.contains("position")) {
            span.classList.remove("position");
        }
    });
    if (!arrayText[index].classList.contains("position")) {
        arrayText[index].classList.add("position");
    }
});

let countScore = 0;
function increaseScore() {
    ++countScore;
    scoreElement.innerText = countScore;
}

function getRandomText() {
    return fetch(RANDOM_TEXT_URL)
        .then((result) => result.json())
        .then((data) => data.content);
}

let seconds = 60;
let countdown;
function startCountdown() {
    if (seconds < 60) {
        countdownElement.innerText = seconds;
    }
    if (seconds > 0) {
        --seconds;
    } else {
        clearInterval(countdown);
        location.replace("/game_over");
        localStorage.setItem("countScore", countScore);
    }
}

async function renderNextRandomText() {
    const text = await getRandomText();
    texDisplayElement.innerHTML = "";
    text.split("").forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        texDisplayElement.appendChild(characterSpan);
    });
    textInputElement.value = null;
    countdownElement.innerText = "1:00";
    if (!countdown) {
        countdown = window.setInterval(() => {
            startCountdown();
        }, 1000);
    }
}

renderNextRandomText();
