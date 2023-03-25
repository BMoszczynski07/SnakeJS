import { point } from "../functions/handleInitializeAudio.js";
import handlePlaceTile from "../functions/handlePlaceTile.js";
import { board, mute, snake, snakePositions } from "../global/variables.js";
import Boost from "./Boost.js";
import getNewTile from "../functions/getNewTile.js";
import { length } from "../global/elements.js";
import handleDisplay from "../functions/handleDisplay.js";

class Food extends Boost {
  handleIsEaten = () => {
    if (snake.class.x === this.x && snake.class.y === this.y) {
      if (!mute.isMuted) {
        point.play();
      }

      board[this.y][this.x].classList.remove("tile--food");
      handlePlaceTile({ mode: "food" });

      //TODO: adding new tiles to the end of the snake
      const { x: firstX, y: firstY } = snakePositions[0];
      const { x: nextX, y: nextY } = snakePositions[1];

      const subX = nextX - firstX;
      const subY = nextY - firstY;

      const { newX, newY } = getNewTile(subX, subY, firstX, firstY);

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
