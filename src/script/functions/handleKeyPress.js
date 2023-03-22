import { gameStarted, snake, snakeDidMove } from "../global/variables.js";
import handleStartGame from "./handleStartGame.js";

const handleKeyPress = ({ key }) => {
  if (key === "M") {
    mute = !mute;
    sound.classList.toggle("sound--muted");
    return;
  }

  if (
    (key === "W" && snake.direction === "S") ||
    (key === "S" && snake.direction === "W") ||
    (key === "A" && snake.direction === "D") ||
    (key === "D" && snake.direction === "A")
  )
    return;

  if (!gameStarted) {
    snake.direction = key;

    handleStartGame();
  }

  if (gameStarted && snakeDidMove) {
    snakeDidMove = false;
    snake.direction = key;
  }
};

export default handleKeyPress;
