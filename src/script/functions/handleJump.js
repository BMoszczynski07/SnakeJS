import { parameterSpeed } from "../global/elements.js";
import {
  boardSize,
  gameInterval,
  interval,
  mute,
  sizeRange,
  snake,
  snakeDidMove,
  SPEED_CONSTANT,
} from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import { snakespeed } from "./handleInitializeAudio.js";
import handleUpdateSnake from "./handleUpdateSnake.js";

const handleIncreaseSnakeSpeed = () => {
  if (snake.class.jumps % (Math.floor(boardSize / 10) * 9) === 0) {
    snake.class.speed = snake.class.speed + 0.1;
    if (!mute.isMuted) {
      snakespeed.play();
    }

    parameterSpeed.classList.add("parameter-speed--acceleration");
    handleDisplay({ speed: snake.class.speed.toFixed(2) });

    setTimeout(() => {
      parameterSpeed.classList.remove("parameter-speed--acceleration");
    }, 1000);

    interval.val =
      750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.class.speed;

    clearInterval(gameInterval.interval);
    gameInterval.set(setInterval(handleJump, interval.val));
  }
};

const handleJump = () => {
  handleUpdateSnake();

  snake.class.jumps++;

  // for (const bonus of bonuses) bonus.handleTransformBonus();

  handleIncreaseSnakeSpeed();

  snakeDidMove.set(true);
};

export default handleJump;
