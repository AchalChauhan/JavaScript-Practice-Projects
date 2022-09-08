let firstCard = 5;
let secondCard = 11;
let sum = firstCard + secondCard;
let hasBlackJack = false;
let isAlive = true;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardEl = document.querySelector("#card-el");

function renderGame() {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message
  sumEl.textContent = "Sum: " + sum;
  cardEl.textContent = "Cards: " + firstCard + " " + secondCard;
}
function newCard(){
    let newCard = 10;
    sum += newCard;
    renderGame();
}
