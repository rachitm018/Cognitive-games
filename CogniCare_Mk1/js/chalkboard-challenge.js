// =================================
// CHALKBOARD CHALLENGE
// =================================

let score = 0;
let round = 1;
let timeLeft = 60;

let timerInterval = null;
let nextQuestionTimeout = null;

let gameActive = false;
let answering = false;

let leftValue = 0;
let rightValue = 0;


// =================================
// START GAME
// =================================

function startChalkboardGame() {

    clearInterval(timerInterval);
    clearTimeout(nextQuestionTimeout);

    score = 0;
    round = 1;
    timeLeft = 60;

    gameActive = false;
    answering = false;

    updateStats();

    document.getElementById("chalkMessage").textContent = "";

    showCountdown();
}


// =================================
// 5 SECOND COUNTDOWN
// =================================

function showCountdown() {

    const board = document.querySelector(".chalkboard");

    const countdown = document.createElement("div");

    countdown.className = "countdown-overlay";
    countdown.id = "countdown";

    countdown.innerHTML = `
        <div class="countdown-number">5</div>
        <p>Get ready...</p>
    `;

    board.appendChild(countdown);

    let count = 5;

    const countdownInterval = setInterval(() => {

        count--;

        const number =
            document.querySelector(".countdown-number");

        if (!number) {
            clearInterval(countdownInterval);
            return;
        }

        if (count > 0) {

            number.textContent = count;

            number.classList.remove("countdown-pop");

            void number.offsetWidth;

            number.classList.add("countdown-pop");

        } else {

            clearInterval(countdownInterval);

            countdown.remove();

            beginGame();
        }

    }, 1000);
}


// =================================
// BEGIN GAME
// =================================

function beginGame() {

    gameActive = true;
    answering = false;

    generateQuestion();

    timerInterval = setInterval(() => {

        timeLeft--;

        updateStats();

        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
}


// =================================
// GENERATE QUESTION
// =================================

function generateQuestion() {

    if (!gameActive) return;

    answering = false;

    const leftQuestion = createExpression();
    const rightQuestion = createExpression();

    leftValue = leftQuestion.answer;
    rightValue = rightQuestion.answer;


    const leftCard =
        document.getElementById("leftCard");

    const rightCard =
        document.getElementById("rightCard");


    // Remove old animation

    leftCard.classList.remove("question-enter");
    rightCard.classList.remove("question-enter");


    // Force browser to restart animation

    void leftCard.offsetWidth;


    document.getElementById("leftExpression").textContent =
        leftQuestion.expression;

    document.getElementById("rightExpression").textContent =
        rightQuestion.expression;


    leftCard.classList.add("question-enter");
    rightCard.classList.add("question-enter");


    document.getElementById("round").textContent = round;
}


// =================================
// CREATE EXPRESSION
// =================================

function createExpression() {

    const number1 = randomNumber(1, 30);
    const number2 = randomNumber(1, 20);

    const operations = ["+", "-"];

    const operation =
        operations[
            Math.floor(Math.random() * operations.length)
        ];


    let answer;

    if (operation === "+") {

        answer = number1 + number2;

    } else {

        answer = number1 - number2;
    }


    return {
        expression: `${number1} ${operation} ${number2}`,
        answer: answer
    };
}


// =================================
// CHOOSE ANSWER
// =================================

function chooseAnswer(choice) {

    if (!gameActive) return;

    // Prevent double clicks
    if (answering) return;

    answering = true;


    let correctAnswer;


    if (leftValue > rightValue) {

        correctAnswer = "left";

    } else if (rightValue > leftValue) {

        correctAnswer = "right";

    } else {

        correctAnswer = "equal";
    }


    const selectedElement =
        getSelectedElement(choice);


    if (choice === correctAnswer) {

        score += 10;

        showMessage("Correct! ✓");

        selectedElement.classList.add("answer-correct");

    } else {

        score = Math.max(0, score - 2);

        showMessage("Try the next one.");

        selectedElement.classList.add("answer-wrong");
    }


    updateStats();


    // Wait before showing the next question

    nextQuestionTimeout = setTimeout(() => {

        selectedElement.classList.remove(
            "answer-correct",
            "answer-wrong"
        );

        round++;

        generateQuestion();

    }, 1000);
}


// =================================
// GET SELECTED ELEMENT
// =================================

function getSelectedElement(choice) {

    if (choice === "left") {

        return document.getElementById("leftCard");

    }

    if (choice === "right") {

        return document.getElementById("rightCard");

    }

    return document.querySelector(".equal-button");
}


// =================================
// MESSAGE
// =================================

function showMessage(message) {

    const messageElement =
        document.getElementById("chalkMessage");

    messageElement.textContent = message;

    messageElement.classList.remove("message-pop");

    void messageElement.offsetWidth;

    messageElement.classList.add("message-pop");
}


// =================================
// KEYBOARD CONTROLS
// =================================

document.addEventListener("keydown", function(event) {

    if (!gameActive) return;

    if (event.key === "ArrowLeft") {

        event.preventDefault();

        chooseAnswer("left");

    }

    else if (event.key === "ArrowRight") {

        event.preventDefault();

        chooseAnswer("right");

    }

    else if (event.key === "ArrowDown") {

        event.preventDefault();

        chooseAnswer("equal");
    }

});


// =================================
// UPDATE STATS
// =================================

function updateStats() {

    document.getElementById("score").textContent =
        score;

    document.getElementById("timer").textContent =
        timeLeft;

    document.getElementById("round").textContent =
        round;
}


// =================================
// END GAME
// =================================

function endGame() {

    gameActive = false;
    answering = true;

    clearInterval(timerInterval);
    clearTimeout(nextQuestionTimeout);


    const messageElement =
        document.getElementById("chalkMessage");


    messageElement.textContent =
        `Time's up! Final score: ${score} ⭐`;


    messageElement.classList.add("game-over");


    document.getElementById("leftCard")
        .classList.add("game-finished");

    document.getElementById("rightCard")
        .classList.add("game-finished");

}


// =================================
// RANDOM NUMBER
// =================================

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


// =================================
// START WHEN PAGE LOADS
// =================================

document.addEventListener(
    "DOMContentLoaded",
    startChalkboardGame
);