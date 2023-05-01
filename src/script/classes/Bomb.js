import GameOver from "../functions/GameOver.js";
import RandInt from "../functions/RandInt.js";
import { bomb } from "../functions/handleInitializeAudio.js";
import { bombsInterval } from "../global/bombs.js";
import { bombs } from "../global/bombs.js";
import { board, gameStarted, mute, snake } from "../global/variables.js";
import Boost from "./Boost.js";

class Bomb extends Boost {
  constructor(x, y) {
    super(x, y);
    this.bombId = bombs.length;

    bombs.push(this);

    const BOMB_INTERVAL_RANGE = RandInt({
      min: 50,
      max: 250,
    });

    this.bombInterval = setInterval(
      this.handleBombTranslate,
      BOMB_INTERVAL_RANGE
    );
  }

  handleBombTranslate = () => {
    if (!gameStarted.val) {
      clearInterval(this.bombInterval);
      return;
    }
    board[this.y][this.x].classList.remove("tile--bomb");

    if (this.x === 0) {
      clearInterval(this.bombInterval);

      const foundIdOfBomb = bombs.findIndex(
        (bomb) => bomb.bombId === this.bombId
      );

      console.log(bombs);
      bombs.splice(foundIdOfBomb, 1);
      console.log(bombs);

      console.log(bombsInterval);

      if (bombs.length === 0) {
        clearInterval(bombsInterval.val);
        bombsInterval.set({ payload: "" });
      }

      return;
    }

    this.x--;

    board[this.y][this.x].classList.add("tile--bomb");
    this.handleBombCollide();
  };

  handleBombCollide = () => {
    if (this.x === snake.class.x && this.y === snake.class.y) {
      if (!mute.isMuted) bomb.play();

      board[this.y][this.x].classList.remove("tile--bomb");

      GameOver();
    }
  };
}

export default Bomb;
