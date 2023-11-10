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

  snakeDidMove = false;

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
    if (this.timer % 30 !== 0) return;

    this.speed = (this.speed += 0.1).toFixed(2);

    this.audio.snakespeed.play();

    this.parameterSpeed.classList.add("parameter-speed--acceleration");
    this.handleDisplay({ speed: this.speed });

    setTimeout(() => {
      this.parameterSpeed.classList.remove("parameter-speed--acceleration");
    }, 1000);

    this.interval =
      750 / (this.boardSize / this.sizeRange.max) / SPEED_CONSTANT / this.speed;

    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(this.handleJump, this.interval);
  };

  handleJump = () => {
    if (Math.random() < 1 && this.bonuses.length === 0)
      this.handleGenerateBonuses();

    this.handleUpdateSnake();

    if (!this.gameStarted) return;

    this.jumps++;

    // for (const bonus of bonuses) bonus.handleTransformBonus();

    this.handleIncreaseSnakeSpeed();

    this.snakeDidMove = !this.snakeDidMove;
  };

  handleMoveSnake = () => {
    this.food.handleIsEaten();
    this.handleBonusIsEaten();
    for (const bomb of this.bombs) bomb.handleBombCollide();

    if (!this.gameStarted) return;

    const { x, y } = this.snakePositions[0];

    if (this.board[this.y][this.x].classList.contains("tile--snake")) {
      this.gameOver();
      return;
    }

    const lastElem = this.board[y][x] ? this.board[y][x] : undefined;

    if (lastElem) {
      if (lastElem.classList.contains("tile--snake-added-point")) {
        for (let i = 0; i < this.snakePositions.length; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[i];
          const newElem = this.board[nextY][nextX];

          if (!newElem.classList.contains("tile--snake-added-point")) {
            newElem.classList.add("tile--snake-added-point");
            break;
          }
        }

        lastElem.classList.remove("tile--snake-added-point");
      } else if (lastElem.classList.contains("tile--snake-subtracted-point")) {
        for (let i = 0; i < this.snakePositions.length; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[i];
          const newElem = this.board[nextY][nextX];

          if (!newElem.classList.contains("tile--snake-subtracted-point")) {
            newElem.classList.add("tile--snake-subtracted-point");
            break;
          }
        }

        lastElem.classList.remove("tile--snake-subtracted-point");
      }
    }

    this.board[y][x].classList.remove("tile--snake");
    this.snakePositions.shift();
    this.board[this.y][this.x].classList.add("tile--snake");
    this.snakePositions.push({ x: this.x, y: this.y });
  };

  handleUpdateSnake = () => {
    switch (this.direction) {
      case "W":
        this.y = this.y === 0 ? boardSize - 1 : this.y - 1;
        this.handleMoveSnake();
        break;
      case "S":
        this.y = this.y === boardSize - 1 ? 0 : this.y + 1;

        this.handleMoveSnake();
        break;
      case "A":
        this.x = this.x === 0 ? boardSize - 1 : this.x - 1;

        this.handleMoveSnake();
        break;
      case "D":
        this.x = this.x === boardSize - 1 ? 0 : this.x + 1;

        this.handleMoveSnake();
        break;
      default:
        console.error("#ERR: Nieprawidłowy kierunek!");
        break;
    }
  };
}

export default Snake;
