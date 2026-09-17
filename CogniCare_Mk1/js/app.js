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

// document.addEventListener("DOMContentLoaded", function () {
//     loadPlayerName();
// });

document.addEventListener("DOMContentLoaded", function () {
    loadPlayerName();

    const nameInput = document.getElementById("playerName");

    if (nameInput) {
        nameInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                continueToGames();
            }
        });
    }
});



