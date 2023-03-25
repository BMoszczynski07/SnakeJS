import { parameterSpeed } from "../global/elements.js";
import { boardSize, interval, mute, snake } from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import { snakespeed } from "./handleInitializeAudio.js";

const handleIncreaseSnakeSpeed = () => {
  if (snake.class.jumps % (Math.floor(boardSize / 10) * 9) === 0) {
    snake.class.speed = snake.class.speed + 0.1;
    if (!mute.isMuted) {
      snakespeed.play();
    }

    parameterSpeed.classList.add("parameter-speed--acceleration");
    handleDisplay({ speed: snake.speed.toFixed(2) });

    setTimeout(() => {
      parameterSpeed.classList.remove("parameter-speed--acceleration");
    }, 1000);

    interval.val =
      750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.speed;

    clearInterval(gameInterval);
    gameInterval = setInterval(handleJump, interval);
  }
};

const handleJump = () => {
  handleUpdateSnake();

  snake.jumps++;

  for (const bonus of bonuses) bonus.handleTransformBonus();

  handleIncreaseSnakeSpeed();

  snakeDidMove = true;
};

export default handleJump;
