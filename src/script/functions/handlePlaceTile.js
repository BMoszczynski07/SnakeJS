import { board, boardSize, food } from "../global/variables.js";
import RandInt from "./RandInt.js";
import Food from "../classes/Food.js";
import Bonus from "../classes/Bonus.js";
import { bonusFiles, bonuses } from "../global/bonuses.js";
import Bomb from "../classes/Bomb.js";

const handlePlaceTile = ({ mode, bonus }) => {
  if (mode === "bonus") {
    // do something if bonus === 'bonus'
    let newBonus;
    if (bonus)
      newBonus = new Bonus(
        0,
        0,
        bonus.name,
        bonuses.length,
        bonus.imgPATH,
        bonus.audioPATH
      );

    const freeTiles = [];

    board[0].forEach((bonus, index) => {
      if (
        !bonus.classList.contains("tile--boost") &&
        !bonus.classList.contains("tile--snake")
      ) {
        freeTiles.push(index);
      }
    });

    if (freeTiles.length === 0) return;

    let rand = RandInt({
      min: 0,
      max: freeTiles.length - 1,
    });

    board[0][freeTiles[rand]].classList.add("tile--boost");
    board[0][
      freeTiles[rand]
    ].style.backgroundImage = `url('${newBonus.imgPATH}')`;

    newBonus.x = freeTiles[rand];

    bonuses.push(newBonus);

    return;
  }

  const tiles = document.querySelectorAll(".tile");
  const freeTiles = document.querySelectorAll(".tile:not(.tile--snake)");

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
    case "bomb":
      let rand = RandInt({
        min: 0,
        max: boardSize - 1,
      });

      board[rand][boardSize - 1].classList.add("tile--bomb");

      new Bomb(boardSize - 1, rand);
      break;
    default:
      console.error("#ERR! -> Przesłano niepoprawny typ bonusu");
      break;
  }
};

export default handlePlaceTile;
