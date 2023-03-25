import {
  gameInterval,
  mute,
  snake,
  timer,
  timerInterval,
} from "../global/variables.js";
import { gameOver } from "./handleInitializeAudio.js";

const GameOver = () => {
  const payload = {
    score: snake.class.length,
    jumps: snake.class.jumps,
    time: {
      hours: Math.floor(timer.time / 60 / 60),
      minutes: Math.floor(timer.time / 60) % 60,
      seconds: timer.time % 60,
    },
  };

  clearInterval(timerInterval.interval);
  clearInterval(gameInterval.interval);

  if (!mute.isMuted) gameOver.play();
};

export default GameOver;
