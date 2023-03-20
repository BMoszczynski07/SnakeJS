import { handleDisplay } from "./handleGenerateBoard";

export const handleIncreaseSnakeSpeed = () => {
  if (snake.jumps % (Math.floor(boardSize / 10) * 9) === 0) {
    snake.speed = snake.speed + 0.1;
    if (!mute) {
      snakespeed.play();
    }

    parameterSpeed.classList.add("parameter-speed--acceleration");
    handleDisplay({ speed: snake.speed.toFixed(2) });

    setTimeout(() => {
      parameterSpeed.classList.remove("parameter-speed--acceleration");
    }, 1000);

    interval = 750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.speed;

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
