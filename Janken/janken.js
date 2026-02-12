const buttons = document.querySelectorAll("button");
const resultE1 = document.getElementById("result");
const playerScoreE1 = document.getElementById("user-score");
const computerScoreE1 = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const result = PlayRound(button.id, ComputerPlay());
        resultE1.textContent = result;

    });
});

function ComputerPlay() {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function PlayRound(playerSelection, computerSelection){
    if(playerSelection === computerSelection){
        return "It's a tie!";
    }
    else if(
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ){
        playerScore++;
        playerScoreE1.textContent = playerScore;
        return "You win! " + playerSelection + " beats " + computerSelection;
    }else{
        computerScore++;
        computerScoreE1.textContent = computerScore;
        return "You lose! " + computerSelection + " beats " + playerSelection;
    }
}