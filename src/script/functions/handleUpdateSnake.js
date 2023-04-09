import { boardSize, snake } from "../global/variables.js";
import handleMoveSnake from "./handleMoveSnake.js";

const handleUpdateSnake = () => {
  switch (snake.class.direction) {
    case "W":
      snake.class.y = snake.class.y === 0 ? boardSize - 1 : snake.class.y - 1;
      handleMoveSnake();
      break;
    case "S":
      snake.class.y = snake.class.y === boardSize - 1 ? 0 : snake.class.y + 1;

      handleMoveSnake();
      break;
    case "A":
      snake.class.x = snake.class.x === 0 ? boardSize - 1 : snake.class.x - 1;

      handleMoveSnake();
      break;
    case "D":
      snake.class.x = snake.class.x === boardSize - 1 ? 0 : snake.class.x + 1;

      handleMoveSnake();
      break;
    default:
      console.error("#ERR: Nieprawidłowy kierunek!");
      break;
  }
};

export default handleUpdateSnake;
