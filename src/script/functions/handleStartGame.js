import {
  boardSize,
  gameInterval,
  gameStarted,
  interval,
  mute,
  sizeRange,
  snake,
  SPEED_CONSTANT,
  timer,
  timerInterval,
} from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import { jump, start } from "./handleInitializeAudio.js";
import handleJump from "./handleJump.js";

const handleStartGame = () => {
  gameStarted.val = true;

  if (!mute.isMuted) {
    start.play();
  }

  interval.val =
    750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.class.speed;

  gameInterval.set(setInterval(handleJump, interval.val));

  timerInterval.set(
    setInterval(() => {
      if (!mute.isMuted) {
        jump.play();
      }

      timer.increment();
      handleDisplay({ timer: timer.time });
    }, 1000)
  );
};

export default handleStartGame;
