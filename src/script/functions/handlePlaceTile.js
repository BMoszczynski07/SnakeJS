import { board, boardSize, bonuses, food } from "../global/variables.js";
import RandInt from "./RandInt.js";
import Food from "../classes/Food.js";
import Bonus from "../classes/Bonus.js";

const handlePlaceTile = ({ mode }) => {
  const tiles = document.querySelectorAll(".tile");
  const freeTiles = document.querySelectorAll(
    ".tile:not(.tile--snake):not(.tile--boost)"
  );

  const randTileId = RandInt({ min: 0, max: freeTiles.length - 1 });

  const indexOfFreeTile = Array.from(tiles).indexOf(freeTiles[randTileId]);
  const tileCoordinates = {
    x: indexOfFreeTile % boardSize,
    y: Math.floor(indexOfFreeTile / boardSize),
  };

  // console.log(indexOfFreeTile % boardSize);

  const { x, y } = tileCoordinates;

  // mark food or bonus on the board
  switch (mode) {
    case "food":
      food.class = new Food(x, y);

      board[food.class.y][food.class.x].classList.add("tile--food");
      break;
    case "bonus":
      let bonus = new Bonus("bonus", x, y);

      bonuses.push(bonus);
      break;
    default:
      console.error("#ERR! -> Przesłano niepoprawny typ bonusu");
      break;
  }
};

export default handlePlaceTile;
