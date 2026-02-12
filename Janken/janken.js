const buttons = document.querySelectorAll(".choice");
const resultE1 = document.getElementById("result");
const playerScoreE1 = document.getElementById("user-score");
const computerScoreE1 = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");
const playerImg = document.getElementById("player-img");
const computerImg = document.getElementById("computer-img");
const difficultySelect = document.getElementById("difficulty");
const themeToggle = document.getElementById("theme-toggle");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const playAgainBtn = document.getElementById("play-again");

const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const clickSound = new Audio("sounds/click.mp3");

let difficulty = "easy";
let lastPlayerMove = null;

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

difficultySelect.addEventListener("change", () => {
    difficulty = difficultySelect.value;
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        if (gameOver) return;

        clickSound.play();

        const playerSelection = button.id;
        lastPlayerMove = playerSelection;

        playerImg.src = `images/${playerSelection}.png`;

        computerImg.src = "images/time.png";
        computerImg.classList.add("thinking");

        setTimeout(() => {

            const computerSelection = ComputerPlay();
            computerImg.classList.remove("thinking");
            computerImg.src = `images/${computerSelection}.png`;

            const result = PlayRound(playerSelection, computerSelection);
            resultE1.textContent = result;

            checkGameOver();

        }, 800);
    });
});


function ComputerPlay() {
    if (difficulty === "hard" && lastPlayerMove) {
        if (lastPlayerMove === "rock") return "paper";
        if (lastPlayerMove === "paper") return "scissors";
        if (lastPlayerMove === "scissors") return "rock";
    }

    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
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
        modalText.textContent = "🎉 You Won The Game!";
        modal.classList.remove("hidden");
        winSound.play();
        endGame();
    }
    else if(computerScore === 5){
        modalText.textContent = "💻 Computer Won!";
        modal.classList.remove("hidden");
        loseSound.play();
        endGame();
    }
}

playAgainBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    resetGame();
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

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

