// engine.js
let score = 0;
let timeLeft = 60;
const timeLeftDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');

function updateScore() {
  score++;
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("Game over! Your score is " + score);
  }
}

const timer = setInterval(updateTime, 1000);

document.querySelectorAll('.square').forEach(square => {
  square.addEventListener('click', () => {
    if (square.classList.contains('enemy')) {
      updateScore();
    }
  });
});
