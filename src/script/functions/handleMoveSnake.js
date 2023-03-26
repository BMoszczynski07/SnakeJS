import { board, food, snake, snakePositions } from "../global/variables.js";
import GameOver from "./GameOver.js";

const handleMoveSnake = () => {
  const { x, y } = snakePositions[0];
  console.log(snakePositions, snake.class);

  if (board[snake.class.y][snake.class.x].classList.contains("tile--snake")) {
    GameOver();
    return;
  }

  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
  board[snake.class.y][snake.class.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.class.x, y: snake.class.y });
  food.class.handleIsEaten();
};

export default handleMoveSnake;
