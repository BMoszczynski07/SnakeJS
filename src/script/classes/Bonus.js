import RandInt from "../functions/RandInt.js";
import handleBonusIsEaten from "../functions/handleBonusIsEaten.js";
import { bonusFiles, bonuses } from "../global/bonuses.js";
import { board, boardSize, interval } from "../global/variables.js";
import Boost from "./Boost.js";

class Bonus extends Boost {
  constructor(x, y, name, bonusID, imgPATH, audioPATH) {
    super(x, y, name);
    this.bonusID = bonusID;
    this.imgPATH = imgPATH;
    this.audioPATH = audioPATH;

    this.boostInterval = setInterval(
      this.handleBonusTranslate,
      (interval.val *
        RandInt({
          min: 25,
          max: 200,
        })) /
        100
    );
  }

  handleBonusTranslate = () => {
    // TODO: bonus translation, check whether the bonus has reached the bottom of the board, if so - delete this bonus from bonuses using this.bonusID
    board[this.y][this.x].classList.remove("tile--boost");
    board[this.y][this.x].style.backgroundImage = "";
    this.y++;

    if (this.y == boardSize) {
      clearInterval(this.boostInterval);
      bonuses.filter((bonus) => bonus !== this.bonusID);
      return;
    }
    const isEaten = handleBonusIsEaten();

    if (isEaten) return;

    board[this.y][this.x].classList.add("tile--boost");
    board[this.y][this.x].style.backgroundImage = `url('${
      bonusFiles[this.name].img
    }')`;
  };
}

export default Bonus;
