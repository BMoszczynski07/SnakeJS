import { board, boardSize, bonuses, food } from "../global/variables.js";
import RandInt from "./RandInt.js";
import Food from "../classes/Food.js";
import Bonus from "../classes/Bonus.js";

const handlePlaceTile = ({ mode, bonus }) => {
  const tiles = document.querySelectorAll(".tile");
  const freeTiles = document.querySelectorAll(
    ".tile:not(.tile--snake):not(.tile--boost):not(.tile--bomb)"
  );

  const randTileId = RandInt({ min: 0, max: freeTiles.length - 1 });

  const indexOfFreeTile = Array.from(tiles).indexOf(freeTiles[randTileId]);
  const tileCoordinates = {
    x: indexOfFreeTile % boardSize,
    y: Math.floor(indexOfFreeTile / boardSize),
  };

  const { x, y } = tileCoordinates;

  // mark food or bonus on the board
  switch (mode) {
    case "food":
      food.class = new Food(x, y);

      board[food.class.y][food.class.x].classList.add("tile--food");
      break;
    case "bonus":
      let newBonus;
      if (bonus) newBonus = new Bonus(x, 0, bonus.name, `${bonus.name}.jpg`);

      bonuses.push(newBonus);
      break;
    case "bomb":
      break;
    default:
      console.error("#ERR! -> Przesłano niepoprawny typ bonusu");
      break;
  }
};

export default handlePlaceTile;
