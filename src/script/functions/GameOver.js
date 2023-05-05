import { bombs, bombsInterval } from "../global/bombs.js";
import { bonuses } from "../global/bonuses.js";
import {
  boardSizeEl,
  container,
  gameover,
  lengthEl,
  pencil,
  playAgain,
  pointsEl,
  shareForm,
  speedEl,
  timerEl,
  usernameInput,
} from "../global/gameover.js";
import { sharePos } from "../global/leaderboard.js";
import {
  board,
  boardSize,
  gameInterval,
  gameStarted,
  handleSetBoardSize,
  mute,
  snake,
  snakePositions,
  timer,
  timerInterval,
} from "../global/variables.js";
import handleGenerateBoard from "./handleGenerateBoard.js";
import { gameOver } from "./handleInitializeAudio.js";

const handlePlayAgain = () => {
  gameover.style.display = "none";
  container.style.display = "none";

  document.querySelectorAll(".tile").forEach((tile) => tile.remove());
  let snakePosLen = snakePositions.length;
  for (let i = 0; i < snakePosLen; i++) {
    snakePositions.shift();
  }

  for (let i = 0; i < boardSize; i++) {
    board.pop();
  }

  let bonusesLen = bonuses.length;

  for (let i = 0; i < bonusesLen; i++) {
    clearInterval(bonuses[0].boostInterval);
    bonuses.shift();
  }

  clearInterval(bombsInterval.val);
  bombsInterval.val = "";

  let bombsLen = bombs.length;

  for (let i = 0; i < bombsLen; i++) {
    clearInterval(bombs[0].bombInterval);
    bombs.shift();
  }

  playAgain.removeEventListener("click", handlePlayAgain);
  pencil.removeEventListener("click", usernameInputFocus);

  handleSetBoardSize();

  handleGenerateBoard();
};

const usernameInputFocus = () => {
  usernameInput.focus();
};

const GameOver = () => {
  gameover.style.display = "flex";
  container.style.display = "flex";

  clearInterval(timerInterval.interval);
  clearInterval(gameInterval.interval);

  gameStarted.val = false;

  const { speed, length } = snake.class;

  const POINTS_CONSTANT = 15;

  const totalPoints = Math.round(length * speed * boardSize * POINTS_CONSTANT);

  const payload = {
    totalPoints,
    speed,
    boardSize,
    length,
    time: {
      hours: Math.floor(timer.time / 60 / 60),
      minutes: Math.floor(timer.time / 60) % 60,
      seconds: timer.time % 60,
    },
  };

  pointsEl.textContent = `${payload.totalPoints} Punkty`;
  speedEl.textContent = `${payload.speed.toFixed(2)} Prędkość`;
  lengthEl.textContent = `${payload.length} Długość`;
  boardSizeEl.textContent = `${payload.boardSize}x${payload.boardSize} Rozmiar`;
  timerEl.textContent = `${
    payload.time.hours > 10 ? payload.time.hours : "0" + payload.time.hours
  }:${
    payload.time.minutes > 10
      ? payload.time.minutes
      : "0" + payload.time.minutes
  }:${
    payload.time.seconds > 10
      ? payload.time.seconds
      : "0" + payload.time.seconds
  } Czas gry`;

  playAgain.addEventListener("click", handlePlayAgain);
  pencil.addEventListener("click", usernameInputFocus);

  shareForm.addEventListener("submit", sharePos);

  setTimeout(() => {
    navigator.vibrate([200, 100, 300]);
  }, 150);

  if (!mute.isMuted) gameOver.play();
};

export default GameOver;
