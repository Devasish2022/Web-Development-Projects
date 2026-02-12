const buttons = document.querySelectorAll(".choice");
const resultE1 = document.getElementById("result");
const playerScoreE1 = document.getElementById("user-score");
const computerScoreE1 = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");
const playerImg = document.getElementById("player-img");
const computerImg = document.getElementById("computer-img");

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(gameOver) return;

        const playerSelection = button.id;
        const computerSelection = ComputerPlay();

        UpdateImages(playerSelection, computerSelection);

        const result = PlayRound(playerSelection, computerSelection);
        resultE1.textContent = result;

        checkGameOver();
    });
});

function UpdateImages(playerChoice, computerChoice) {
    playerImg.src = `images/${playerChoice}.png`;
    computerImg.src = `images/${computerChoice}.png`;
}

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

function checkGameOver(){
    if(playerScore === 5){
        resultE1.textContent = "Congratulations! You won the game!";
        endGame();
    }
    else if(computerScore === 5){
        resultE1.textContent = "Game Over! The computer won the game!";
        endGame();
    }
}

function endGame(){
    gameOver = true;
    buttons.forEach( button => button.disabled = true);
}

resetBtn.addEventListener("click", resetGame);

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerImg.src = "";
    computerImg.src = "";

    playerScoreE1.textContent = playerScore;
    computerScoreE1.textContent = computerScore;
    resultE1.textContent = "Game reset! Make your move!";

    buttons.forEach( button => button.disabled = false);
}

