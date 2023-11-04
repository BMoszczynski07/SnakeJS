import Boost from "./Boost.js";

class Food extends Boost {
  getNewTile = (subX, subY, firstX, firstY) => {
    let x = firstX;
    let y = firstY;

    if (subX !== 0) {
      x = (firstX - subX + this.boardSize) % this.boardSize;
    } else if (subY !== 0) {
      y = (firstY - subY + this.boardSize) % this.boardSize;
    }

    if (this.board[y][x].classList.contains("tile--snake")) {
      //! game over
      this.gameOver();
      return { newX: x, newY: y };
    }

    return { newX: x, newY: y };
  };

  handleIsEaten = () => {
    if (this.snake === this.x && this.snake.y === this.y) {
      if (!this.audio.mute) {
        this.audio.point.play();
      }

      this.board[this.y][this.x].classList.remove("tile--food");
      this.handlePlaceTile({ mode: "food" });

      const { newX, newY } = this.handleFoodEaten();

      if (!this.gameStarted) return;

      let snakePosLen = this.snakePositions.length;

      const { x: firstX, y: firstY } = this.snakePositions[0];
      const firstElem = this.board[firstY][firstX]
        ? this.board[firstY][firstX]
        : undefined;

      if (firstElem) {
        if (firstElem.classList.contains("tile--snake-added-point")) {
          // remove added points

          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = this.snakePositions[i];
            const nextElem = this.board[nextY][nextX];

            nextElem.classList.remove("tile--snake-added-point");
          }
        } else if (
          firstElem.classList.contains("tile--snake-subtracted-point")
        ) {
          // remove subtracted points

          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = this.snakePositions[0];
            const nextElem = this.board[nextY][nextX];

            if (nextElem.classList.contains("tile--snake-subtracted-point")) {
              nextElem.classList.remove("tile--snake-subtracted-point");
              nextElem.classList.remove("tile--snake");
              this.snakePositions.shift();
              this.snake.length--;
            } else break;
          }
        }
      }

      this.snake.length++;
      this.handleDisplay({ snakeLength: this.snake.length });
      this.length.style.color = "#d1d122";

      this.snakePositions.unshift({ x: newX, y: newY });
      this.board[newY][newX].classList.add("tile--snake");

      setTimeout(() => {
        this.length.style.color = "#000";
      }, 300);
    }
  };
}

export default Food;
