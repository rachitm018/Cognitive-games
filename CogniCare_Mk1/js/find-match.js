// =================================
// FIND THE MATCH
// =================================


// Familiar objects

const cardItems = [
    "🍎",
    "🍌",
    "🐶",
    "🐱",
    "🚗",
    "🌸",
    "☀️",
    "⭐"
];


// Game variables

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;


// Start the game

function startMemoryGame() {

    const gameBoard = document.getElementById("gameBoard");
    const gameMessage = document.getElementById("gameMessage");

    // Reset variables

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    matchedPairs = 0;

    gameMessage.textContent = "";

    // Create pairs

    let cards = [...cardItems, ...cardItems];

    // Shuffle cards

    cards = shuffle(cards);

    // Clear board

    gameBoard.innerHTML = "";


    // Create cards

    cards.forEach((item, index) => {

        const card = document.createElement("button");

        card.classList.add("memory-card");

        card.dataset.value = item;

        card.innerHTML = `
            <div class="card-front"></div>

            <div class="card-back">
                ${item}
            </div>
        `;


        card.addEventListener("click", () => {

            flipCard(card);

        });


        gameBoard.appendChild(card);

    });

}


// Flip a card

function flipCard(card) {

    // Don't allow invalid clicks

    if (lockBoard) return;

    if (card === firstCard) return;

    if (card.classList.contains("matched")) return;


    // Reveal card

    card.classList.add("flipped");


    // First card

    if (!firstCard) {

        firstCard = card;

        return;

    }


    // Second card

    secondCard = card;


    // Check match

    checkMatch();

}


// Check whether cards match

function checkMatch() {

    const isMatch =
        firstCard.dataset.value === secondCard.dataset.value;


    if (isMatch) {

        handleMatch();

    } else {

        handleMismatch();

    }

}


// Matching cards

function handleMatch() {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");

    matchedPairs++;


    resetCards();


    // Game complete

    if (matchedPairs === cardItems.length) {

        const gameMessage =
            document.getElementById("gameMessage");

        gameMessage.textContent =
            "Wonderful! You found all the matches. 🌟";
    }

}


// Non-matching cards

function handleMismatch() {

    lockBoard = true;


    setTimeout(() => {

        firstCard.classList.remove("flipped");

        secondCard.classList.remove("flipped");

        resetCards();

    }, 900);

}


// Reset selected cards

function resetCards() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// Shuffle cards

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];

    }

    return shuffled;
}


// Start game automatically

document.addEventListener(
    "DOMContentLoaded",
    startMemoryGame
);