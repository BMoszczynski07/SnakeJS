import Boost from "./Boost.js";

class Bonus extends Boost {
  constructor(id, imgPATH) {
    this.bonusID = id;
    this.imgPATH = imgPATH;

    this.boostInterval = setInterval(this.handleBonusTranslate, 1000);
  }

  handleBonusTranslate = () => {
    // TODO: bonus translation, check whether the bonus has reached the bottom of the board, if so - delete this bonus from bonuses using this.bonusID
  };

  handleIsEaten = () => {
    // TODO: check whether the bonus (x,y) suits the (x,y) of the snake, if so - delete this bonus from bonuses using this.bonusID and execute this bonus dependent on the bonus.name
  };
}

export default Bonus;
