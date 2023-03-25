import { board, food, snake, snakePositions } from "../global/variables.js";
import GameOver from "./GameOver.js";

const handleMoveSnake = () => {
  const { x, y } = snakePositions[0];
  if (board[snake.class.y][snake.class.x].classList.contains("tile--snake")) {
    GameOver();
    return;
  }

  board[snake.class.y][snake.class.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.class.x, y: snake.class.y });
  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
  food.class.handleIsEaten();
};

export default handleMoveSnake;
