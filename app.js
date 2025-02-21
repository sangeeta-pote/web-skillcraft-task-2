// app.js
let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('timeDisplay');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

function updateDisplay() {
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = Math.floor(elapsedTime % 60);
  timeDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num < 10 ? '0' + num : num;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
}

function recordLap() {
  const lapTime = elapsedTime;
  lapTimes.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
  lapList.appendChild(lapItem);
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${padZero(hours)}:${padZero(minutes % 60)}:${padZero(seconds % 60)}`;
}

// Event listeners
startPauseButton.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
    startPauseButton.textContent = 'Start';
    resetButton.disabled = false;
    lapButton.disabled = true;
  } else {
    startTimer();
    startPauseButton.textContent = 'Pause';
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
  isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
  resetTimer();
  lapTimes = [];
  lapList.innerHTML = '';
  startPauseButton.textContent = 'Start';
  resetButton.disabled = true;
  lapButton.disabled = true;
  isRunning = false;
});

lapButton.addEventListener('click', recordLap);
