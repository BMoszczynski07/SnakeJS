import { bombs } from "../global/bombs.js";
import {
  board,
  food,
  gameStarted,
  snake,
  snakePositions,
} from "../global/variables.js";
import GameOver from "./GameOver.js";
import handleBonusIsEaten from "./handleBonusIsEaten.js";

const handleMoveSnake = () => {
  food.class.handleIsEaten();
  handleBonusIsEaten();
  for (const bomb of bombs) bomb.handleBombCollide();

  if (!gameStarted.val) return;

  const { x, y } = snakePositions[0];

  if (board[snake.class.y][snake.class.x].classList.contains("tile--snake")) {
    GameOver();
    return;
  }

  const lastElem = board[y][x];

  if (lastElem) {
    if (lastElem.classList.contains("tile--snake-added-point")) {
      for (let i = 0; i < snakePositions.length; i++) {
        const { x: nextX, y: nextY } = snakePositions[i];
        const newElem = board[nextY][nextX];

        if (!newElem.classList.contains("tile--snake-added-point")) {
          newElem.classList.add("tile--snake-added-point");
          break;
        }
      }

      lastElem.classList.remove("tile--snake-added-point");
    } else if (lastElem.classList.contains("tile--snake-subtracted-point")) {
      for (let i = 0; i < snakePositions.length; i++) {
        const { x: nextX, y: nextY } = snakePositions[i];
        const newElem = board[nextY][nextX];

        if (!newElem.classList.contains("tile--snake-subtracted-point")) {
          newElem.classList.add("tile--snake-subtracted-point");
          break;
        }
      }

      lastElem.classList.remove("tile--snake-subtracted-point");
    }
  }

  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
  board[snake.class.y][snake.class.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.class.x, y: snake.class.y });
};

export default handleMoveSnake;
