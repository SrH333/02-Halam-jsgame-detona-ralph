// engine.js
let score = 0;
let timeLeft = 60;
let highScores = [50]; // Array de recordes
const timeLeftDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const highScoresDisplay = document.getElementById('high-scores');
const container = document.querySelector('.container');
let timer;

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    checkGameOver();
  }
}

function checkGameOver() {
  if (score <= highScores[0]) {
    showGameOverScreen("Game over! Your score is " + score);
  } else {
    alert("Congratulations! You surpassed the previous high score!");
    highScores.unshift(score);
    updateHighScoresDisplay();
  }
}

function updateHighScoresDisplay() {
  highScoresDisplay.innerHTML = highScores.map(score => `<li>${score}</li>`).join('');
}

function showGameOverScreen(message) {
  const gameOverDiv = document.createElement('div');
  gameOverDiv.classList.add('game-over');

  const messageP = document.createElement('p');
  messageP.textContent = message;
  gameOverDiv.appendChild(messageP);

  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continuar';
  continueButton.classList.add('continue-button');
  continueButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    timeLeftDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;
    container.removeChild(gameOverDiv);
    startGame();
  });
  gameOverDiv.appendChild(continueButton);

  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.classList.add('exit-button');
  exitButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    timeLeftDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;
    highScores = [50];
    updateHighScoresDisplay();
    container.removeChild(gameOverDiv);
    startGame();
  });
  gameOverDiv.appendChild(exitButton);

  container.appendChild(gameOverDiv);
}

function startGame() {
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

document.querySelectorAll('.square').forEach(square => {
  square.addEventListener('click', () => {
    if (square.classList.contains('enemy')) {
      updateScore();
    }
  });
});

startGame();
