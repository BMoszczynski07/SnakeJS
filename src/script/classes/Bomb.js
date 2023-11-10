import Boost from "./Boost.js";

class Bomb extends Boost {
  bombs = [];

  constructor(x, y) {
    super(x, y);
    this.bombId = this.bombs.length;

    this.bombs.push(this);

    const BOMB_INTERVAL_RANGE = this.Rand.GetInteger({
      min: 50,
      max: 250,
    });

    this.bombInterval = setInterval(
      this.handleBombTranslate,
      BOMB_INTERVAL_RANGE
    );
  }

  handleBombTranslate = () => {
    if (!this.gameStarted) {
      clearInterval(this.bombInterval);
      return;
    }
    this.board[this.y][this.x].classList.remove("tile--bomb");

    if (this.x === 0) {
      clearInterval(this.bombInterval);

      const foundIdOfBomb = this.bombs.findIndex(
        (bomb) => bomb.bombId === this.bombId
      );

      console.log(this.bombs);
      this.bombs.splice(foundIdOfBomb, 1);
      console.log(this.bombs);

      if (this.bombs.length === 0) {
        clearInterval(this.bombsInterval);
        this.bombsInterval = "";
      }

      return;
    }

    this.x--;

    this.board[this.y][this.x].classList.add("tile--bomb");
    this.handleBombCollide();
  };

  handleBombCollide = () => {
    if (this.x === this.snake.x && this.y === this.snake.y) {
      if (!this.audio.mute) this.bomb.play();

      this.board[this.y][this.x].classList.remove("tile--bomb");
      clearInterval(this.bombInterval);

      this.gameOver();
      return;
    }
  };
}

export default Bomb;
