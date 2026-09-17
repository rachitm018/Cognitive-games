let targetNumber = "";

let numberLength = 3;
let numberRound = 1;
let numberScore = 0;

let numberCountdownTimer = null;
let acceptingNumber = false;


// =================================
// START GAME
// =================================

function startNumberMemory() {

    clearInterval(numberCountdownTimer);

    targetNumber = "";

    numberLength = 3;
    numberRound = 1;
    numberScore = 0;

    acceptingNumber = false;

    updateNumberStats();

    document.getElementById("numberMessage").textContent = "";
    document.getElementById("numberDisplay").textContent = "";

    document.getElementById("numberInput").value = "";

    document.getElementById("numberInputArea").style.display = "none";

    startNumberCountdown();
}


// =================================
// COUNTDOWN
// =================================

function startNumberCountdown() {

    const status =
        document.getElementById("numberStatus");

    let count = 3;

    status.textContent = count;

    numberCountdownTimer = setInterval(function () {

        count--;

        if (count > 0) {

            status.textContent = count;

        } else {

            clearInterval(numberCountdownTimer);

            status.textContent = "Memorize!";

            setTimeout(function () {
                showNumber();
            }, 700);

        }

    }, 1000);
}


// =================================
// CREATE NUMBER
// =================================

function createNumber() {

    let number = "";

    for (let i = 0; i < numberLength; i++) {

        number += Math.floor(Math.random() * 10);

    }

    return number;
}


// =================================
// SHOW NUMBER
// =================================

function showNumber() {

    const display =
        document.getElementById("numberDisplay");

    const status =
        document.getElementById("numberStatus");


    targetNumber = createNumber();

    display.textContent = targetNumber;

    display.classList.remove("number-pop");

    void display.offsetWidth;

    display.classList.add("number-pop");

    status.textContent = "Remember this number";


    // Display time increases slightly with length

    const displayTime =
        Math.max(1800, numberLength * 650);


    setTimeout(function () {

        hideNumber();

    }, displayTime);
}


// =================================
// HIDE NUMBER
// =================================

function hideNumber() {

    const display =
        document.getElementById("numberDisplay");

    const status =
        document.getElementById("numberStatus");

    const inputArea =
        document.getElementById("numberInputArea");


    display.textContent = "";

    status.textContent = "Your turn";

    inputArea.style.display = "flex";

    acceptingNumber = true;

    document.getElementById("numberInput").value = "";

    document.getElementById("numberInput").focus();
}


// =================================
// SUBMIT NUMBER
// =================================

function submitNumber() {

    if (!acceptingNumber) {
        return;
    }


    const input =
        document.getElementById("numberInput");

    const playerNumber =
        input.value.trim();


    if (playerNumber === "") {
        return;
    }


    acceptingNumber = false;


    if (playerNumber === targetNumber) {

        numberScore += numberLength * 10;

        showCorrectNumber();

    } else {

        showWrongNumber(playerNumber);

    }
}


// =================================
// CORRECT
// =================================

function showCorrectNumber() {

    const status =
        document.getElementById("numberStatus");

    const message =
        document.getElementById("numberMessage");

    const inputArea =
        document.getElementById("numberInputArea");


    inputArea.style.display = "none";

    status.textContent = "Correct!";

    message.textContent = "✓ Perfect memory!";

    message.classList.remove("message-pop");

    void message.offsetWidth;

    message.classList.add("message-pop");


    numberRound++;

    numberLength++;

    updateNumberStats();


    setTimeout(function () {

        message.textContent = "";

        startNumberCountdown();

    }, 1200);
}


// =================================
// WRONG
// =================================

function showWrongNumber(playerNumber) {

    const status =
        document.getElementById("numberStatus");

    const message =
        document.getElementById("numberMessage");

    const inputArea =
        document.getElementById("numberInputArea");


    inputArea.style.display = "none";

    status.textContent = "Game Over";

    message.textContent =
        "✕ The number was " + targetNumber;

    message.classList.remove("message-pop");

    void message.offsetWidth;

    message.classList.add("message-pop");
}


// =================================
// UPDATE STATS
// =================================

function updateNumberStats() {

    document.getElementById("numberScore").textContent =
        numberScore;

    document.getElementById("numberRound").textContent =
        numberRound;

    document.getElementById("numberLength").textContent =
        numberLength;
}


// =================================
// ENTER KEY
// =================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        submitNumber();

    }

});


// =================================
// START AUTOMATICALLY
// =================================

window.addEventListener("load", function () {

    startNumberMemory();

});