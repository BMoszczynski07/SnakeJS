import RandInt from "../functions/RandInt.js";
import handleBonus from "../functions/handleBonus.js";
import { bonusFiles, bonuses } from "../global/bonuses.js";
import {
  board,
  boardSize,
  gameStarted,
  interval,
  mute,
  snake,
} from "../global/variables.js";
import Boost from "./Boost.js";

class Bonus extends Boost {
  constructor(x, y, name, bonusID, imgPATH, audioPATH) {
    super(x, y, name);
    this.bonusID = bonusID;
    this.imgPATH = imgPATH;
    this.audioPATH = audioPATH;

    const intervalRange =
      (interval.val *
        RandInt({
          min: 10,
          max: 200,
        })) /
      100;

    this.boostInterval = setInterval(this.handleBonusTranslate, intervalRange);
  }

  handleBonusTranslate = () => {
    // TODO: bonus translation, check whether the bonus has reached the bottom of the board, if so - delete this bonus from bonuses using this.bonusID
    if (!gameStarted.val) {
      clearInterval(this.boostInterval);
      return;
    }
    board[this.y][this.x].classList.remove("tile--boost");
    board[this.y][this.x].style.backgroundImage = "";
    this.y++;

    if (this.x === snake.class.x && this.y === snake.class.y) {
      clearInterval(this.boostInterval);
      console.log("eaten -> bonus ate snake");

      const foundBonusID = bonuses.findIndex(
        (bns) => bns.bonusID === this.bonusID
      );

      bonuses.splice(foundBonusID, 1);

      handleBonus({ type: this.name });

      if (!mute.isMuted) {
        const bonus = new Audio();
        bonus.src = this.audioPATH;
        bonus.play();
      }
      return;
    }

    if (this.y === boardSize) {
      const foundBonusID = bonuses.findIndex(
        (bns) => bns.bonusID === this.bonusID
      );
      clearInterval(this.boostInterval);
      bonuses.splice(foundBonusID, 1);
      return;
    }

    board[this.y][this.x].classList.add("tile--boost");
    board[this.y][this.x].style.backgroundImage = `url('${
      bonusFiles[this.name].img
    }')`;
  };
}

export default Bonus;
