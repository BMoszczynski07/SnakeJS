import {
  gameInterval,
  gameStarted,
  mute,
  snake,
  timer,
  timerInterval,
} from "../global/variables.js";
import { gameOver } from "./handleInitializeAudio.js";

const GameOver = () => {
  clearInterval(timerInterval.interval);
  clearInterval(gameInterval.interval);

  gameStarted.val = false;

  const payload = {
    score: snake.class.length,
    jumps: snake.class.jumps,
    time: {
      hours: Math.floor(timer.time / 60 / 60),
      minutes: Math.floor(timer.time / 60) % 60,
      seconds: timer.time % 60,
    },
  };

  setTimeout(() => {
    navigator.vibrate([200, 100, 300]);
  }, 150);

  if (!mute.isMuted) gameOver.play();
};

export default GameOver;
