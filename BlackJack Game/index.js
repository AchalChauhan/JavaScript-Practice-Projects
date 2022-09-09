let player = {
  name : "Achal",
  chips: 200
}
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardEl = document.querySelector("#card-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $ " + player.chips; 


function getRandonCard()
{
  let randomCard = Math.floor( (Math.random()*13)+1);
  if(randomCard > 10)
  {
    return 10;
  }else if(randomCard ===1)
  {
    return 11;
  }else{
  return randomCard;
  }
}


function startGame(){
  isAlive = true;
  let firstCard = getRandonCard();
  let secondCard = getRandonCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard

    renderGame();
}
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
  cardEl.textContent = "Cards: ";
  for(let i=0; i<cards.length; i++)
  {
    cardEl.textContent += cards[i] + " ";
  }
}
function newCard(){
    
  if(isAlive == true && hasBlackJack == false)
  {let newCard = getRandonCard();
    sum += newCard;
    cards.push(newCard);
    console.log(cards);
    renderGame();
  }
}

