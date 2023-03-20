import Boost from "./Boost";

class Food extends Boost {
  handleIsEaten = () => {
    if (snake.x === this.x && snake.y === this.y) {
      if (!mute) {
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

      snake.length++;
      length.textContent = snake.length;
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
