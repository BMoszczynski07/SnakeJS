import { bonusImgs, bonuses } from "../global/bonuses.js";
import { board, boardSize } from "../global/variables.js";
import Boost from "./Boost.js";

class Bonus extends Boost {
  constructor(x, y, name, bonusID, imgPATH, audioPATH) {
    super(x, y, name);
    this.bonusID = bonusID;
    this.imgPATH = imgPATH;
    this.audioPATH = audioPATH;

    this.boostInterval = setInterval(this.handleBonusTranslate, 300);
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

    board[this.y][this.x].classList.add("tile--boost");
    board[this.y][this.x].style.backgroundImage = `url('${
      bonusImgs[this.name]
    }')`;
    board[this.y][this.x].style.backgroundSize = "cover";
  };

  handleIsEaten = () => {
    // TODO: check whether the bonus (x,y) suits the (x,y) of the snake, if so - delete this bonus from bonuses using this.bonusID and execute this bonus dependent on the bonus.name
    clearInterval(this.handleBonusTranslate);
  };
}

export default Bonus;
