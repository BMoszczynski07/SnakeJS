import Board from "./Board.js";

class Snake extends Board {
  constructor(direction, length, speed, x, y, jumps = 0) {
    this.direction = direction;
    this.length = length;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.jumps = jumps;
  }

  handleBonusIsEaten = () => {
    let selectedBonus;

    this.bonuses.map((bonus, index) => {
      if (bonus.x === this.x && bonus.y === this.y)
        selectedBonus = { bonus, index };
    });

    if (selectedBonus) {
      const { bonus: foundBonus, index } = selectedBonus;

      clearInterval(this.bonuses[index].boostInterval);

      console.log("eaten -> snake ate bonus");
      const foundTile = this.board[foundBonus.y][foundBonus.x];

      foundTile.classList.remove("tile--boost");
      foundTile.style.backgroundImage = "";

      this.bonuses.splice(index, 1);

      this.handleBonus({ type: foundBonus.name });

      if (!mute.isMuted) {
        const bonus = new Audio();
        bonus.src = foundBonus.audioPATH;
        bonus.play();
      }
    }
  };

  handleIncreaseSnakeSpeed = () => {
    if (this.timer % 30 === 0) {
      this.speed = (this.speed += 0.1).toFixed(2);

      this.audio.snakespeed.play();

      this.parameterSpeed.classList.add("parameter-speed--acceleration");
      this.handleDisplay({ speed: this.speed });

      setTimeout(() => {
        this.parameterSpeed.classList.remove("parameter-speed--acceleration");
      }, 1000);

      this.interval =
        750 /
        (this.boardSize / this.sizeRange.max) /
        SPEED_CONSTANT /
        this.speed;

      clearInterval(gameInterval.interval);
      gameInterval.set(setInterval(handleJump, interval.val));
    }
  };
}

export default Snake;
