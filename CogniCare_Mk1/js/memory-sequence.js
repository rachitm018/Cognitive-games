









let sequence = [];
let playerSequence = [];
let sequenceLength = 3;
let round = 1;
let score = 0;
let acceptingInput = false;
let countdownTimer = null;
let messageTimer = null;

function startSequenceGame() {
    clearInterval(countdownTimer);
    clearTimeout(messageTimer);

    sequence = [];
    playerSequence = [];
    sequenceLength = 3;
    round = 1;
    score = 0;
    acceptingInput = false;

    updateStats();

    document.getElementById("sequenceMessage").textContent = "";
    document.getElementById("sequenceDisplay").textContent = "";
    document.getElementById("sequenceButtons").innerHTML = "";

    startCountdown();
}

function startCountdown() {
    const status = document.getElementById("sequenceStatus");

    let count = 5;
    status.textContent = count;

    countdownTimer = setInterval(function () {
        count--;

        if (count > 0) {
            status.textContent = count;
        } else {
            clearInterval(countdownTimer);

            status.textContent = "Remember!";

            setTimeout(function () {
                createSequence();
            }, 700);
        }
    }, 1000);
}

function createSequence() {
    const symbols = ["●", "▲", "■", "★", "◆", "✚"];

    sequence = [];
    playerSequence = [];
    acceptingInput = false;

    for (let i = 0; i < sequenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        sequence.push(symbols[randomIndex]);
    }

    showSequence();
}

async function showSequence() {
    const display = document.getElementById("sequenceDisplay");
    const buttons = document.getElementById("sequenceButtons");
    const status = document.getElementById("sequenceStatus");

    buttons.innerHTML = "";
    display.textContent = "";
    status.textContent = "Remember the sequence";

    for (let i = 0; i < sequence.length; i++) {
        display.textContent = sequence[i];

        display.classList.remove("sequence-pop");
        void display.offsetWidth;
        display.classList.add("sequence-pop");

        await wait(850);

        display.textContent = "";

        await wait(300);
    }

    status.textContent = "Your turn";

    createButtons();

    acceptingInput = true;
}

function createButtons() {
    const buttons = document.getElementById("sequenceButtons");

    buttons.innerHTML = "";

    const symbols = ["●", "▲", "■", "★", "◆", "✚"];

    symbols.forEach(function (symbol) {
        const button = document.createElement("button");

        button.className = "sequence-button";
        button.textContent = symbol;

        button.onclick = function () {
            chooseSymbol(symbol);
        };

        buttons.appendChild(button);
    });
}

function chooseSymbol(symbol) {
    if (!acceptingInput) {
        return;
    }

    const position = playerSequence.length;

    if (symbol !== sequence[position]) {
        acceptingInput = false;
        showWrongAnswer();
        return;
    }

    playerSequence.push(symbol);

    if (playerSequence.length === sequence.length) {
        acceptingInput = false;

        score += sequenceLength * 10;

        showRoundComplete();
    } else {
        showCorrectChoice();
    }
}

function showCorrectChoice() {
    const message = document.getElementById("sequenceMessage");

    message.textContent = "✓ Correct";

    message.classList.remove("message-pop");
    void message.offsetWidth;
    message.classList.add("message-pop");
}

function showRoundComplete() {
    const status = document.getElementById("sequenceStatus");
    const message = document.getElementById("sequenceMessage");

    status.textContent = "Well done!";
    message.textContent = "✓ Sequence complete";

    message.classList.remove("message-pop");
    void message.offsetWidth;
    message.classList.add("message-pop");

    round++;
    sequenceLength++;

    updateStats();

    messageTimer = setTimeout(function () {
        message.textContent = "";
        startCountdown();
    }, 1200);
}

function showWrongAnswer() {
    const status = document.getElementById("sequenceStatus");
    const message = document.getElementById("sequenceMessage");
    const buttons = document.getElementById("sequenceButtons");

    status.textContent = "Wrong! Try this level again";
    message.textContent = "✕ Incorrect sequence";

    message.classList.remove("message-pop");
    void message.offsetWidth;
    message.classList.add("message-pop");

    buttons.innerHTML = "";

    messageTimer = setTimeout(function () {
        message.textContent = "";
        startCountdown();
    }, 1200);
}

function updateStats() {
    document.getElementById("sequenceScore").textContent = score;
    document.getElementById("sequenceRound").textContent = round;
    document.getElementById("sequenceLength").textContent = sequenceLength;
}

function wait(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}

window.onload = function () {
    startSequenceGame();
};