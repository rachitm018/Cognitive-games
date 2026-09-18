let flowScore = 0;
let flowRound = 1;
let flowLives = 3;

let currentLeaf = null;
let acceptingFlowInput = false;

let flowTimer = null;
let countdownTimer = null;


// =================================
// DIRECTIONS
// =================================

const flowDirections = [
    "left",
    "right",
    "up",
    "down"
];


// =================================
// START GAME
// =================================

function startFlowGame() {

    clearTimeout(flowTimer);
    clearInterval(countdownTimer);

    flowScore = 0;
    flowRound = 1;
    flowLives = 3;

    currentLeaf = null;
    acceptingFlowInput = false;

    updateFlowStats();

    document.getElementById("flowMessage").textContent = "";

    const leaf = document.getElementById("flowLeaf");

    leaf.style.display = "none";
    leaf.className = "flow-leaf";

    startFlowCountdown();
}


// =================================
// COUNTDOWN
// =================================

function startFlowCountdown() {

    const status = document.getElementById("flowStatus");

    let count = 3;

    status.textContent = count;

    countdownTimer = setInterval(function () {

        count--;

        if (count > 0) {

            status.textContent = count;

        } else {

            clearInterval(countdownTimer);

            status.textContent = "Go!";

            setTimeout(function () {
                nextLeaf();
            }, 500);

        }

    }, 1000);
}


// =================================
// NEXT LEAF
// =================================

function nextLeaf() {

    acceptingFlowInput = false;

    const leaf = document.getElementById("flowLeaf");
    const leafImage = leaf.querySelector("img");

    const water = document.getElementById("flowWater");
    const status = document.getElementById("flowStatus");

    // Random type
    const type =
        Math.random() < 0.5
            ? "green"
            : "yellow";

    // Direction the leaf points
    const leafDirection = randomDirection();

    // Direction the leaf flows
    let flowDirection = randomDirection();

    // Make the two directions different
    if (flowDirection === leafDirection) {
        flowDirection = differentDirection(leafDirection);
    }

    currentLeaf = {
        type: type,
        leafDirection: leafDirection,
        flowDirection: flowDirection
    };


    // =================================
    // RESET LEAF
    // =================================

    leaf.className = "flow-leaf";
    leaf.style.display = "flex";

    leaf.style.left = "50%";
    leaf.style.top = "50%";

    leafImage.className = "leaf-image";


    // =================================
    // LEAF COLOR
    // =================================

    leaf.classList.add(type);
    leafImage.src = type === "green"
    ? "assets/images/leaf-green.svg"
    : "assets/images/leaf-yellow.svg";


    // =================================
    // LEAF ORIENTATION
    // =================================

    leafImage.classList.add(
        "point-" + leafDirection
    );


    // =================================
    // RANDOM POSITION
    // =================================

    const waterWidth = water.clientWidth;
    const waterHeight = water.clientHeight;

    const margin = 70;

    const randomX =
        margin +
        Math.random() *
        (waterWidth - margin * 2);

    const randomY =
        margin +
        Math.random() *
        (waterHeight - margin * 2);

    leaf.style.left = randomX + "px";
    leaf.style.top = randomY + "px";


    // =================================
    // FLOW DIRECTION
    // =================================

    leaf.classList.add(
        "move-" + flowDirection
    );


    // =================================
    // MESSAGE
    // =================================

    if (type === "green") {

        status.textContent =
            "Follow the direction of the leaf";

    } else {

        status.textContent =
            "Follow the direction of the flow";

    }


    // =================================
    // REACTION TIME
    // =================================

    const reactionTime =
        Math.max(
            1000,
            2500 - (flowRound - 1) * 100
        );


    acceptingFlowInput = true;

    clearTimeout(flowTimer);

    flowTimer = setTimeout(function () {

        if (acceptingFlowInput) {
            wrongFlowAnswer();
        }

    }, reactionTime);
}


// =================================
// RANDOM DIRECTION
// =================================

function randomDirection() {

    return flowDirections[
        Math.floor(
            Math.random() *
            flowDirections.length
        )
    ];
}


// =================================
// DIFFERENT DIRECTION
// =================================

function differentDirection(direction) {

    let newDirection;

    do {

        newDirection = randomDirection();

    } while (newDirection === direction);

    return newDirection;
}


// =================================
// PLAYER ANSWER
// =================================

function chooseFlow(direction) {

    if (!acceptingFlowInput) {
        return;
    }

    acceptingFlowInput = false;

    clearTimeout(flowTimer);

    const correctDirection =
        currentLeaf.type === "green"
            ? currentLeaf.leafDirection
            : currentLeaf.flowDirection;


    if (direction === correctDirection) {

        correctFlowAnswer();

    } else {

        wrongFlowAnswer();

    }
}


// =================================
// CORRECT
// =================================

function correctFlowAnswer() {

    const leaf =
        document.getElementById("flowLeaf");

    const message =
        document.getElementById("flowMessage");

    const status =
        document.getElementById("flowStatus");


    flowScore += 10;
    flowRound++;


    leaf.classList.add("flow-correct");

    message.textContent = "✓ Correct!";

    message.classList.remove("message-pop");

    void message.offsetWidth;

    message.classList.add("message-pop");

    status.textContent = "Well done!";

    updateFlowStats();


    setTimeout(function () {

        message.textContent = "";

        nextLeaf();

    }, 650);
}


// =================================
// WRONG
// =================================

function wrongFlowAnswer() {

    acceptingFlowInput = false;

    clearTimeout(flowTimer);

    const leaf =
        document.getElementById("flowLeaf");

    const message =
        document.getElementById("flowMessage");

    const status =
        document.getElementById("flowStatus");


    flowLives--;

    leaf.classList.add("flow-wrong");

    message.textContent = "✕ Wrong direction";

    message.classList.remove("message-pop");

    void message.offsetWidth;

    message.classList.add("message-pop");

    updateFlowStats();


    if (flowLives <= 0) {

        status.textContent = "Game Over";

        setTimeout(function () {

            leaf.style.display = "none";

            message.textContent =
                "Game over — Score: " + flowScore;

        }, 700);

        return;
    }


    status.textContent = "Try again";


    setTimeout(function () {

        message.textContent = "";

        nextLeaf();

    }, 700);
}


// =================================
// UPDATE STATS
// =================================

function updateFlowStats() {

    document.getElementById("flowScore").textContent =
        flowScore;

    document.getElementById("flowRound").textContent =
        flowRound;

    document.getElementById("flowLives").textContent =
        flowLives;
}


// =================================
// KEYBOARD CONTROLS
// =================================

document.addEventListener("keydown", function (event) {

    if (!acceptingFlowInput) {
        return;
    }

    if (event.key === "ArrowLeft") {

        event.preventDefault();
        chooseFlow("left");

    }

    else if (event.key === "ArrowRight") {

        event.preventDefault();
        chooseFlow("right");

    }

    else if (event.key === "ArrowUp") {

        event.preventDefault();
        chooseFlow("up");

    }

    else if (event.key === "ArrowDown") {

        event.preventDefault();
        chooseFlow("down");

    }

});


// =================================
// START
// =================================

window.addEventListener("load", function () {

    startFlowGame();

});
