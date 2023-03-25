import { board, boardSize } from "../global/variables.js";
import GameOver from "./GameOver.js";

const getNewTile = (subX, subY, firstX, firstY) => {
  let x = firstX;
  let y = firstY;

  if (subX !== 0) {
    x = (firstX - subX + boardSize) % boardSize;
  } else if (subY !== 0) {
    y = (firstY - subY + boardSize) % boardSize;
  }

  if (board[y][x].classList.contains("tile--snake")) {
    //! game over
    GameOver();
  }

  return { newX: x, newY: y };
};

export default getNewTile;
