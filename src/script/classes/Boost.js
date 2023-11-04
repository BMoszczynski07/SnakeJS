import Board from "./Board.js";

class Boost extends Board {
  bombsInterval = "";

  constructor(x, y, name = "") {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  handleFoodEaten = () => {
    //TODO: adding new tiles to the end of the snake
    const { x: firstX, y: firstY } = this.snakePositions[0];
    const { x: nextX, y: nextY } = this.snakePositions[1]
      ? this.snakePositions[1]
      : { x: undefined, y: undefined };

    if (!nextX || !nextY) {
      let newTile = { x: 0, y: 0 };

      switch (this.snake.direction) {
        case "W":
          newTile.x = firstX;
          newTile.y = firstY + 1;
          break;
        case "S":
          newTile.x = firstX;
          newTile.y = firstY - 1;
          break;
        case "A":
          newTile.x = firstX + 1;
          newTile.y = firstY;
          break;
        case "D":
          newTile.x = firstX - 1;
          newTile.y = firstY;
          break;
      }

      return { newX: newTile.x, newY: newTile.y };
    }

    const subX = nextX - firstX;
    const subY = nextY - firstY;

    return this.getNewTile(subX, subY, firstX, firstY);
  };
}

export default Boost;
