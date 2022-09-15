const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll('button');
let userChoice; 
let computerChoice;
let result;
possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice;
    genrateComputerChoice();
    getResult();
}))

function genrateComputerChoice(){
    const randomNumber = Math.floor(Math.random()*possibleChoices.length)+1;
     console.log(randomNumber);
     if(randomNumber === 1){
        computerChoice = '✊';
     }
     if(randomNumber === 2){
        computerChoice = '🖖';
     }
     if(randomNumber === 3){
        computerChoice = '✋'
     }
     computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult(){
    if(computerChoice === userChoice)
    {
        result = "It's a Draw!!";
    }if(computerChoice === '✊' && userChoice === '🖖')
    {
        result = "You lost the Game!";
    }if(computerChoice === '✋' && userChoice === '✊')
    {
        result = "You lost the Game!";
    }if(computerChoice === '🖖' && userChoice === '✋')
    {
        result = "You lost the Game!";
    }if(computerChoice === '🖖' && userChoice === '✊')
    {
        result = "You Won the Game!";
    }if(computerChoice === '✊' && userChoice === '✋')
    {
        result = "You Won the Game!";
    }if(computerChoice === '✋' && userChoice === '🖖')
    {
        result = "You Won the Game!";
    }
    resultDisplay.innerHTML = result;
}