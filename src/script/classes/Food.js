import { point } from "../functions/handleInitializeAudio.js";
import handlePlaceTile from "../functions/handlePlaceTile.js";
import {
  board,
  gameStarted,
  mute,
  snake,
  snakePositions,
} from "../global/variables.js";
import Boost from "./Boost.js";
import { length } from "../global/elements.js";
import handleDisplay from "../functions/handleDisplay.js";
import handleFoodEaten from "../functions/handleFoodEaten.js";

class Food extends Boost {
  handleIsEaten = () => {
    if (snake.class.x === this.x && snake.class.y === this.y) {
      if (!mute.isMuted) {
        point.play();
      }

      board[this.y][this.x].classList.remove("tile--food");
      handlePlaceTile({ mode: "food" });

      const { newX, newY } = handleFoodEaten();

      if (!gameStarted.val) return;

      let snakePosLen = snakePositions.length;

      const { x: firstX, y: firstY } = snakePositions[0];
      const firstElem = board[firstY][firstX];

      if (firstElem) {
        if (firstElem.classList.contains("tile--snake-added-point")) {
          // remove added points

          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = snakePositions[i];
            const nextElem = board[nextY][nextX];

            nextElem.classList.remove("tile--snake-added-point");
          }
        } else if (
          firstElem.classList.contains("tile--snake-subtracted-point")
        ) {
          // remove subtracted points

          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = snakePositions[0];
            const nextElem = board[nextY][nextX];

            if (nextElem.classList.contains("tile--snake-subtracted-point")) {
              nextElem.classList.remove("tile--snake-subtracted-point");
              nextElem.classList.remove("tile--snake");
              snakePositions.shift();
              snake.class.length--;
            } else break;
          }
        }
      }

      snake.class.length++;
      handleDisplay({ snakeLength: snake.class.length });
      length.style.color = "#d1d122";

      snakePositions.unshift({ x: newX, y: newY });
      board[newY][newX].classList.add("tile--snake");

      setTimeout(() => {
        length.style.color = "#000";
      }, 300);
    }
  };
}

export default Food;
