import preferences from "../global/preferences.js";
import {
  board,
  gameStarted,
  snake,
  snakePositions,
} from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import handleFoodEaten from "./handleFoodEaten.js";

const handleBonus = ({ type }) => {
  switch (type) {
    case "Nystagmus":
      preferences.class.handleNystagmus();
      break;
    case "+5 points":
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          let { x, y } = snakePositions[i];
          if (board[y][x].classList.contains("tile--snake-added-point"))
            board[y][x].classList.remove("tile--snake-added-point");
          else break;
        }
      }, 500);

      for (let i = 0; i < 5; i++) {
        const { x: nextX, y: nextY } = snakePositions[0];
        const nextElem = board[nextY][nextX];
        if (nextElem.classList.contains("tile--snake-subtracted-point")) {
          nextElem.classList.remove("tile--snake-subtracted-point");
          nextElem.classList.remove("tile--snake");
          snakePositions.shift();
          snake.class.length--;
        } else break;
      }

      for (let i = 0; i < 5; i++) {
        const newCoordinates = handleFoodEaten();

        if (!gameStarted.val) return;

        if (newCoordinates) {
          const { newX, newY } = newCoordinates;

          snake.class.length++;
          handleDisplay({ snakeLength: snake.class.length });
          snakePositions.unshift({ x: newX, y: newY });
          board[newY][newX].classList.add("tile--snake");
          board[newY][newX].classList.add("tile--snake-added-point");
        }
      }
      break;
    case "-5 points":
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const { x: nextX, y: nextY } = snakePositions[0];
          const nextElem = board[nextY][nextX];
          if (nextElem.classList.contains("tile--snake-subtracted-point")) {
            nextElem.classList.remove("tile--snake-subtracted-point");
            nextElem.classList.remove("tile--snake");
            snakePositions.shift();
            snake.class.length--;
            handleDisplay({ snakeLength: snake.class.length });
          } else break;
        }
      }, 500);

      for (let i = 0; i < 5; i++) {
        const { x: nextX, y: nextY } = snakePositions[i];

        if (board[nextY][nextX].classList.contains("tile--snake-added-point")) {
          board[nextY][nextX].classList.remove("tile--snake-added-point");
          board[nextY][nextX].classList.add("tile--snake-subtracted-point");
        } else {
          if (i === snakePositions.length - 1) break;
          else
            board[nextY][nextX].classList.add("tile--snake-subtracted-point");
        }
      }
      break;
    default:
      console.error("#ERR -> Nieznany typ bonusu!");
      break;
  }
};

export default handleBonus;
