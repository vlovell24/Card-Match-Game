let cards = document.querySelectorAll('.flip-card-inner');
let pickedCards = document.getElementsByClassName('flip-card-back');
let flipCard = document.querySelectorAll('.flip-card');
const newGameButton = document.querySelector("#newGameButton");
//adds an event listener to the new game button
newGameButton.addEventListener("click", function() {
    buttonClickSound.play();
    setTimeout(function(){newGame()},200);
});
//an array storing all of the backface card images. There are 16 cards, therefore, there are 8 different
//cards, repeated once.
const cardsArray = [
    'IMAGES/brocolli.png',
    'IMAGES/carrot.png',
    'IMAGES/corn.png',
    'IMAGES/eggplant.png',
    'IMAGES/lettuce.png',
    'IMAGES/onion.png',
    'IMAGES/pumpkin.png',
    'IMAGES/tomato.png',
    'IMAGES/brocolli.png',
    'IMAGES/carrot.png',
    'IMAGES/corn.png',
    'IMAGES/eggplant.png',
    'IMAGES/lettuce.png',
    'IMAGES/onion.png',
    'IMAGES/pumpkin.png',
    'IMAGES/tomato.png'
];
let twoCardsPicked = [];
let parentCards = [];
let emptyScore = 0;
let score = document.querySelector("#playerScore");
score.innerText = `Player Score: ${emptyScore}`;
let emptyTurns = 0;
let turns = document.querySelector('#turns');
turns.innerText = `Turns: ${emptyTurns}`;
const clickA = new Audio('SOUNDS/clickA.wav');
const correct = new Audio('SOUNDS/correct.wav');
const wrong = new Audio('SOUNDS/wrong2.wav');
const buttonClickSound = new Audio('SOUNDS/buttonClick.wav');
const myModal = document.getElementById("PopupModal");
//adds an event listener to each card, and runs the startGame function
for (let i = 0; i <cards.length; i++) {
    let card = cards[i];
    card.addEventListener("click", startGame);
}
//toggles the card flips on click, and disables the event listener if the card has already been flipped.
//pushes the card selection to an empty array, if the array has two values, it compares the two, and
//runs either the matched() function, or the notMatched() function (also plays the corresponding sound
//effects).
function startGame () {
    clickA.play();
    let parentNode = this.parentNode;
    let childCard = this.childNodes[3].querySelector('img').src;
    this.classList.toggle('flip-card-inner-hover');
    parentNode.classList.toggle('pulse');
    this.removeEventListener("click", startGame);
    twoCardsPicked.push(childCard);
    parentCards.push(parentNode);
    if (twoCardsPicked.length === 2) {
        if (twoCardsPicked[0] === twoCardsPicked[1]) {
            matched();
            correct.play();
        }else {
            notMatched();
            wrong.play();

        }
    }
}
//adds the event listeners back to the disabled cards, and flips them back again; after a 800ms delay.
//then updates the turns by one, and clears the two card arrays.
function notMatched() {
    let parentCard1 = parentCards[0].childNodes[1];
    let parentCard2 = parentCards[1].childNodes[1];
    parentCards[0].childNodes[1].addEventListener("click", startGame);
    parentCards[1].childNodes[1].addEventListener("click", startGame);
    setTimeout(function () {
        parentCard1.classList.toggle('flip-card-inner-hover');
        parentCard2.classList.toggle('flip-card-inner-hover');
    }, 800);
    emptyTurns += 1;
    turns.innerText = `Turns: ${emptyTurns}`;
    twoCardsPicked = [];
    parentCards = [];
}

//removes the event listener of the matched cards, removes the pulse animation, and replaces it with the flash
//animation. Clears the two card arrays, updates the score by one, and the turns by one. Sets a modal to
//display, if the score equals 8 (which is all cards flipped).
function matched() {
    parentCards[0].childNodes[1].removeEventListener("click", startGame);
    parentCards[1].childNodes[1].removeEventListener("click", startGame);
    parentCards[0].classList.remove('pulse');
    parentCards[1].classList.remove('pulse');
    parentCards[0].classList.toggle('flash');
    parentCards[1].classList.toggle('flash');
    parentCards = [];
    twoCardsPicked = [];
    emptyScore += 1;
    emptyTurns += 1;
    turns.innerText = `Turns: ${emptyTurns}`;
    score.innerText = `Player Score: ${emptyScore}`;
    if (emptyScore === 8) {
        myModal.style.display = "block";
    }

}

//resets score, turns, all arrays, hides the popup modal. Shuffles the cards randomly after a 800ms timeout,
// removes all previous classes (animation classes like flash/pulse).
function newGame() {
    emptyScore = 0;
    emptyTurns = 0;
    parentCards = [];
    twoCardsPicked = [];
    turns.innerText = `Turns: ${emptyTurns}`;
    score.innerText = `Player Score: ${emptyScore}`;
    myModal.style.display = "none";
    let newCards = shuffle(cardsArray);
    let pickedCardsImage;
    toggleCardsBack();
    removeClasses();
    setTimeout(function() {
        for (let i = 0; i < pickedCards.length; i++) {
            pickedCardsImage = pickedCards[i].firstElementChild;
            for (let ii = 0; ii < newCards.length; ii++) {
                pickedCardsImage.src = newCards[i];
            }
        }
    }, 800);
}

//removes the flash class from all the cards
function removeClasses () {
    for (let i = 0; i <flipCard.length; i++) {
        flipCard[i].classList.remove('flash');
    }
}

//flips the cards back over
function toggleCardsBack()
{
    for (let c = 0; c < cards.length; c++) {
        cards[c].classList.remove("flip-card-inner-hover");
        cards[c].addEventListener("click", startGame);
    }
}

//shuffles the deck randomly
function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}