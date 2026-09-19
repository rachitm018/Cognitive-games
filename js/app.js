// Start from the landing page

function startGame() {
    window.location.href = "profile.html";
}


// Open a specific game from the landing page preview card —
// still asks for the player's name first, same as the main flow

function openPreviewGame(gamePage) {
    localStorage.setItem("pendingGame", gamePage);
    window.location.href = "profile.html";
}


// Continue from the profile page

function continueToGames() {

    const nameInput = document.getElementById("playerName");
    const errorMessage = document.getElementById("errorMessage");

    const playerName = nameInput.value.trim();

    if (playerName === "") {
        errorMessage.textContent = "Please enter a name.";
        return;
    }

    localStorage.setItem("playerName", playerName);

    // If they arrived here via a specific game preview,
    // send them straight to that game instead of the games list

    const pendingGame = localStorage.getItem("pendingGame");

    if (pendingGame) {
        localStorage.removeItem("pendingGame");
        window.location.href = pendingGame;
    } else {
        window.location.href = "games.html";
    }
}


// Load the player's name on the games page

function loadPlayerName() {

    const playerName = localStorage.getItem("playerName");

    const nameElement = document.getElementById("playerName");

    if (nameElement && playerName) {
        nameElement.textContent = playerName;
    }
}


// Open a game

function openGame(gamePage) {
    window.location.href = gamePage;
}


// Return to the home page

function goHome() {
    window.location.href = "index.html";
}


// Run when the page loads

document.addEventListener("DOMContentLoaded", function () {
    loadPlayerName();
});


/* =====================================
   COGNICARE CHATBOT
===================================== */


/* =====================================
   COGNICARE CHATBOT
===================================== */


/* Get HTML Elements */

const chatbotBtn = document.getElementById("chatbot-btn");

const chatbotBox = document.getElementById("chatbot-box");

const closeChat = document.getElementById("close-chat");

const sendBtn = document.getElementById("send-btn");

const userInput = document.getElementById("user-input");

const chatMessages = document.getElementById("chat-messages");


/* =====================================
   OPEN CHATBOT
===================================== */

chatbotBtn.addEventListener("click", function () {

    chatbotBox.style.display = "flex";

});


/* =====================================
   CLOSE CHATBOT
===================================== */

closeChat.addEventListener("click", function () {

    chatbotBox.style.display = "none";

});


/* =====================================
   SEND MESSAGE
===================================== */

sendBtn.addEventListener("click", function () {

    sendMessage();

});


/* Press Enter to send */

userInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});


/* =====================================
   SEND MESSAGE FUNCTION
===================================== */

function sendMessage() {

    let message = userInput.value.trim();


    /* Don't send empty message */

    if (message === "") {

        return;

    }


    /* Show user's message */

    addUserMessage(message);


    /* Clear input */

    userInput.value = "";


    /* Get chatbot answer */

    let reply = getBotReply(message);


    /* Small delay to make it feel natural */

    setTimeout(function () {

        addBotMessage(reply);

    }, 400);

}


/* =====================================
   ADD USER MESSAGE
===================================== */

function addUserMessage(message) {

    let messageDiv = document.createElement("div");

    messageDiv.classList.add("user-message");

    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);


    /* Scroll to bottom */

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


/* =====================================
   ADD BOT MESSAGE
===================================== */

function addBotMessage(message) {

    let messageDiv = document.createElement("div");

    messageDiv.classList.add("bot-message");

    messageDiv.innerHTML = message;

    chatMessages.appendChild(messageDiv);


    /* Scroll to bottom */

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


/* =====================================
   QUICK QUESTION
===================================== */

function askQuestion(question) {

    addUserMessage(question);

    let reply = getBotReply(question);

    setTimeout(function () {

        addBotMessage(reply);

    }, 400);

}


/* =====================================
   CHATBOT BRAIN
===================================== */

function getBotReply(message) {

    /* Convert message to lowercase */

    message = message.toLowerCase();


    /* -------------------------------
       GREETING
    -------------------------------- */

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey") ||
        message.includes("namaste") ||
        message.includes("नमस्ते")
    ) {

        return `
            Hello! 👋
            <br><br>
            Welcome to CogniCare.
            How can I help you today?
        `;

    }


    /* -------------------------------
       GAME SUGGESTION
    -------------------------------- */

    if (
        message.includes("which game") ||
        message.includes("suggest") ||
        message.includes("what should i play") ||
        message.includes("game should") ||
        message.includes("play")
    ) {

        return `
            🌱 You can start with
            <b>Number Memory</b> or
            <b>Find the Match</b>.
            <br><br>
            Choose whichever feels comfortable.
            There is no pressure to get a perfect score.
        `;

    }


    /* -------------------------------
       AVAILABLE GAMES
    -------------------------------- */

    if (
        message.includes("available games") ||
        message.includes("what games") ||
        message.includes("games available") ||
        message.includes("games")
    ) {

        return `
            🎮 CogniCare currently offers:
            <br><br>

            🧩 <b>Find the Match</b><br>
            Match familiar pictures.
            <br><br>

            🧮 <b>Chalkboard Challenge</b><br>
            Compare numbers.
            <br><br>

            🔢 <b>Number Memory</b><br>
            Remember a number.
            <br><br>

            🌿 <b>Eb & Flow</b><br>
            Follow visual patterns.
            <br><br>

            🧠 <b>Memory Sequence</b><br>
            Remember and repeat a sequence.
        `;

    }


    /* -------------------------------
       NUMBER MEMORY
    -------------------------------- */

    if (
        message.includes("number memory") ||
        message.includes("number game") ||
        message.includes("remember number")
    ) {

        return `
            🔢 <b>Number Memory</b> works like this:
            <br><br>

            1️⃣ A number appears on the screen.
            <br>
            2️⃣ Try to remember it.
            <br>
            3️⃣ The number disappears.
            <br>
            4️⃣ Type the number you remember.
            <br><br>

            Take your time 😊
        `;

    }


    /* -------------------------------
       FIND THE MATCH
    -------------------------------- */

    if (
        message.includes("find the match") ||
        message.includes("matching") ||
        message.includes("match game")
    ) {

        return `
            🧩 <b>Find the Match</b> is a picture-matching activity.
            <br><br>

            You need to find two pictures that belong together.
            <br><br>

            It is designed to encourage visual memory and attention.
        `;

    }


    /* -------------------------------
       CHALKBOARD
    -------------------------------- */

    if (
        message.includes("chalkboard") ||
        message.includes("compare numbers") ||
        message.includes("greater number")
    ) {

        return `
            🧮 <b>Chalkboard Challenge</b> shows numbers
            and asks you to identify which number is greater.
            <br><br>

            It is a simple activity for attention and number recognition.
        `;

    }


    /* -------------------------------
       MEMORY SEQUENCE
    -------------------------------- */

    if (
        message.includes("memory sequence") ||
        message.includes("sequence")
    ) {

        return `
            🧠 <b>Memory Sequence</b> asks you to remember
            a simple sequence and repeat it.
            <br><br>

            Start slowly and focus on one step at a time. 🌱
        `;

    }


    /* -------------------------------
       PURPOSE OF COGNICARE
    -------------------------------- */

    if (
        message.includes("what is cognicare") ||
        message.includes("about cognicare") ||
        message.includes("purpose") ||
        message.includes("why cognicare")
    ) {

        return `
            🧠 <b>CogniCare</b> is a gentle cognitive
            wellness platform.
            <br><br>

            It provides simple games designed to encourage
            memory, attention and engagement.
            <br><br>

            The activities are meant to be supportive
            and low-pressure.
        `;

    }


    /* -------------------------------
       HOW DOES IT HELP
    -------------------------------- */

    if (
        message.includes("how does") ||
        message.includes("how it help") ||
        message.includes("benefit") ||
        message.includes("help")
    ) {

        return `
            🌿 CogniCare provides simple activities that
            encourage:
            <br><br>

            🧠 Memory<br>
            🎯 Attention<br>
            🔄 Recall<br>
            👀 Visual recognition<br>
            😊 Engagement
            <br><br>

            The goal is to make cognitive activities
            simple and enjoyable.
        `;

    }


    /* -------------------------------
       DIFFICULTY
    -------------------------------- */

    if (
        message.includes("difficult") ||
        message.includes("hard") ||
        message.includes("easy")
    ) {

        return `
            🌱 Start with the activity that feels
            comfortable for you.
            <br><br>

            CogniCare is designed to be low-pressure.
            You can take your time.
        `;

    }

    /* -------------------------------
       LANGUAGE
    -------------------------------- */

    if (
        message.includes("language") ||
        message.includes("hindi") ||
        message.includes("marathi") ||
        message.includes("english")
    ) {

        return `
            🌐 You can change the language using
            the language selector in the navigation bar.
            <br><br>

            More regional languages can be added
            in future versions.
        `;

    }


    /* -------------------------------
       THANK YOU
    -------------------------------- */

    if (
        message.includes("thank") ||
        message.includes("thanks")
    ) {

        return `
            You're welcome! 😊
            <br><br>
            Take your time and enjoy the activity.
        `;

    }


    /* -------------------------------
       BYE
    -------------------------------- */

    if (
        message.includes("bye") ||
        message.includes("goodbye")
    ) {

        return `
            Goodbye! 👋
            <br><br>
            Have a peaceful day.
        `;

    }


    /* -------------------------------
       DEFAULT RESPONSE
    -------------------------------- */

    return `
        I'm still learning 😊
        <br><br>

        You can ask me things like:
        <br><br>

        • Which game should I play?
        <br>
        • What is Number Memory?
        <br>
        • What games are available?
        <br>
        • How does CogniCare help?
        <br>
        • How can I change the language?
    `;

}
