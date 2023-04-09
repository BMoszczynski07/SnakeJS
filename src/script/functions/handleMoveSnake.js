import { board, food, snake, snakePositions } from "../global/variables.js";
import GameOver from "./GameOver.js";
import handleBonusIsEaten from "./handleBonusIsEaten.js";

const handleMoveSnake = () => {
  food.class.handleIsEaten();
  handleBonusIsEaten();

  const { x, y } = snakePositions[0];

  if (board[snake.class.y][snake.class.x].classList.contains("tile--snake")) {
    GameOver();
    return;
  }

  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
  board[snake.class.y][snake.class.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.class.x, y: snake.class.y });
};

export default handleMoveSnake;
