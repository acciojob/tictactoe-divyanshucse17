// Get elements
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");
const playerInputsDiv = document.getElementById("player-inputs");
const gameBoardDiv = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Start the game after getting player names
submitButton.addEventListener("click", () => {
  player1 = player1Input.value.trim() || "Player 1";
  player2 = player2Input.value.trim() || "Player 2";

  currentPlayer = player1;

  playerInputsDiv.style.display = "none";
  gameBoardDiv.style.display = "block";

  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return; // already filled

    // Place X or O
    cell.textContent = currentPlayer === player1 ? "X" : "O";
    board[index] = cell.textContent;

    // Check winner
    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      endGame();
      return;
    }

    // Check draw
    if (board.every(cell => cell !== "")) {
      messageDiv.textContent = `It's a draw!`;
      endGame();
      return;
    }

    // Switch turn
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

// Check if current player has won
function checkWinner() {
  const playerSymbol = currentPlayer === player1 ? "X" : "O";

  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === playerSymbol);
  });
}

// End the game by disabling board
function endGame() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
