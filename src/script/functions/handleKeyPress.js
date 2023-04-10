import { sound } from "../global/elements.js";
import {
  gameStarted,
  mute,
  snake,
  snakeDidMove,
  snakePositions,
} from "../global/variables.js";
import handleStartGame from "./handleStartGame.js";

const handleKeyPress = ({ key }) => {
  if (key === "M") {
    mute.isMuted = !mute.isMuted;
    sound.classList.toggle("sound--muted");
    return;
  }

  if (
    (key === "W" && snake.class.direction === "S") ||
    (key === "S" && snake.class.direction === "W") ||
    (key === "A" && snake.class.direction === "D") ||
    (key === "D" && snake.class.direction === "A")
  )
    return;

  if (!gameStarted.val && snake.class.jumps === 0) {
    if (key === "S") {
      snakePositions.reverse();
      snake.set({
        attr: "y",
        payload: snakePositions[snakePositions.length - 1].y,
      });
    }

    snake.class.direction = key;

    handleStartGame();
  }

  if (gameStarted.val && snakeDidMove.state) {
    snakeDidMove.set(false);
    snake.class.direction = key;
  }
};

export default handleKeyPress;
