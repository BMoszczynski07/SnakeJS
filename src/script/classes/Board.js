import Bonus from "./Bonus.js";
import Food from "./Food.js";
import Game from "./Game.js";
import ResultForm from "./ResultForm.js";
import Snake from "./Snake.js";

class Board extends Game {
  board = [];
  sizeRange = { min: 10, max: 40 };
  boardSize = 20;
  gameBoard = document.querySelector(".gameboard");

  // zmienna przechowująca koordynaty (x,y) wszystkich "kafelków" węża
  snakePositions = [];

  timer = 0;

  time = document.querySelector("[data-parameter=time]");
  size = document.querySelector("[data-parameter=board-size]");
  parameterSpeed = document.querySelector("[data-parameter=speed]");
  length = document.querySelector("[data-parameter=length]");

  snake = "";
  food = "";

  bonuses = [];
  bombs = [];

  bombsInterval = "";

  resultForm = "";

  timerInterval = "";

  gameInterval = "";
  interval = 0;

  payload = "";

  SPEED_CONSTANT = 4;

  getNewTile = (subX, subY, firstX, firstY) => {
    let x = firstX;
    let y = firstY;

    if (subX !== 0) {
      x = (firstX - subX + this.boardSize) % this.boardSize;
    } else if (subY !== 0) {
      y = (firstY - subY + this.boardSize) % this.boardSize;
    }

    if (this.board[y][x].classList.contains("tile--snake")) {
      //! game over
      this.gameOver();
      return { newX: x, newY: y };
    }

    return { newX: x, newY: y };
  };

  handleFoodEaten = () => {
    //TODO: adding new tiles to the end of the snake
    const { x: firstX, y: firstY } = this.snakePositions[0];
    const { x: nextX, y: nextY } = this.snakePositions[1]
      ? this.snakePositions[1]
      : { x: undefined, y: undefined };

    if (!nextX || !nextY) {
      let newTile = { x: 0, y: 0 };

      switch (this.snake.direction) {
        case "W":
          newTile.x = firstX;
          newTile.y = firstY + 1;
          break;
        case "S":
          newTile.x = firstX;
          newTile.y = firstY - 1;
          break;
        case "A":
          newTile.x = firstX + 1;
          newTile.y = firstY;
          break;
        case "D":
          newTile.x = firstX - 1;
          newTile.y = firstY;
          break;
      }

      return { newX: newTile.x, newY: newTile.y };
    }

    const subX = nextX - firstX;
    const subY = nextY - firstY;

    return this.getNewTile(subX, subY, firstX, firstY);
  };

  handleBonus = ({ type }) => {
    let snakePosLen;

    switch (type) {
      case "Nystagmus":
        this.preferences.handleNystagmus();
        break;
      case "+5 points":
        setTimeout(() => {
          for (let i = 0; i < this.snakePositions.length; i++) {
            let { x, y } = this.snakePositions[i];
            if (this.board[y][x].classList.contains("tile--snake-added-point"))
              this.board[y][x].classList.remove("tile--snake-added-point");
            else break;
          }
        }, 500);

        snakePosLen = this.snakePositions.length;

        for (let i = 0; i < snakePosLen; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[0];
          const nextElem = this.board[nextY][nextX];
          if (nextElem.classList.contains("tile--snake-subtracted-point")) {
            nextElem.classList.remove("tile--snake-subtracted-point");
            nextElem.classList.remove("tile--snake");
            this.snakePositions.shift();
            this.snake.length--;
          } else break;
        }

        for (let i = 0; i < 5; i++) {
          const newCoordinates = this.handleFoodEaten();

          if (!this.gameStarted) return;

          if (newCoordinates) {
            const { newX, newY } = newCoordinates;

            this.snake.length++;
            this.handleDisplay({ snakeLength: this.snake.length });
            this.snakePositions.unshift({ x: newX, y: newY });
            this.board[newY][newX].classList.add("tile--snake");
            this.board[newY][newX].classList.add("tile--snake-added-point");
          }
        }
        break;
      case "-5 points":
        setTimeout(() => {
          let snakePosLen = this.snakePositions.length;
          for (let i = 0; i < snakePosLen; i++) {
            const { x: nextX, y: nextY } = this.snakePositions[0];
            const nextElem = this.board[nextY][nextX];
            if (nextElem.classList.contains("tile--snake-subtracted-point")) {
              nextElem.classList.remove("tile--snake-subtracted-point");
              nextElem.classList.remove("tile--snake");
              this.snakePositions.shift();
              this.snake.length--;
              this.handleDisplay({ snakeLength: snake.class.length });
            } else break;
          }
        }, 500);

        for (let i = 0; i < 5; i++) {
          const { x: nextX, y: nextY } = this.snakePositions[i];

          if (
            this.board[nextY][nextX].classList.contains(
              "tile--snake-added-point"
            )
          ) {
            this.board[nextY][nextX].classList.remove(
              "tile--snake-added-point"
            );
            this.board[nextY][nextX].classList.add(
              "tile--snake-subtracted-point"
            );
          } else {
            if (i === this.snakePositions.length - 1) break;
            else
              this.board[nextY][nextX].classList.add(
                "tile--snake-subtracted-point"
              );
          }
        }
        break;
      case "Bombs":
        navigator.vibrate(100);
        if (this.bombsInterval === "")
          this.bombsInterval = setInterval(() => {
            this.bombsState = !this.bombsState;

            console.log("interval");

            this.preferences.root.style.setProperty(
              "--bomb-color",
              this.bombsState ? "#000" : "#f00"
            );
          }, 250);

        for (let i = 0; i < Math.floor(this.boardSize * (2 / 5)); i++) {
          this.handlePlaceTile({ mode: "bomb" });
        }
        break;
      default:
        console.error("#ERR -> Nieznany typ bonusu!");
        break;
    }
  };

  gameOver = () => {
    this.gameStarted = false;

    this.resultForm = new ResultForm();

    resultForm.show();

    clearInterval(this.timerInterval);
    clearInterval(this.gameInterval);

    const { speed, length } = this.snake;

    const POINTS_CONSTANT = 15;

    const totalPoints = Math.round(
      length * speed * boardSize * POINTS_CONSTANT
    );

    this.payload = {
      totalPoints,
      speed,
      boardSize: this.boardSize,
      length,
      time: {
        hours: Math.floor(this.timer / 60 / 60),
        minutes: Math.floor(this.timer / 60) % 60,
        seconds: this.timer % 60,
      },
    };

    setTimeout(() => {
      navigator.vibrate([200, 100, 300]);
    }, 150);

    if (!mute.isMuted) this.audio.gameOver.play();
  };

  handlePlayAgain = () => {
    document.querySelectorAll(".tile").forEach((tile) => tile.remove());
    let snakePosLen = this.snakePositions.length;
    for (let i = 0; i < snakePosLen; i++) {
      this.snakePositions.shift();
    }

    for (let i = 0; i < boardSize; i++) {
      this.board.pop();
    }

    let bonusesLen = this.bonuses.length;

    for (let i = 0; i < bonusesLen; i++) {
      clearInterval(this.bonuses[0].boostInterval);
      bonuses.shift();
    }

    clearInterval(this.bombsInterval);

    this.bombsInterval = "";

    let bombsLen = this.bombs.length;

    for (let i = 0; i < bombsLen; i++) {
      clearInterval(this.bombs[0].bombInterval);
      this.bombs.shift();
    }

    this.handleSetBoardSize();

    this.handleGenerateBoard();
  };

  handleValidateBoardSize = () => {
    let size;

    while (!size || size < this.sizeRange.min || size > this.sizeRange.max) {
      const input = prompt(
        `Podaj wielkość planszy (minimalna - ${this.sizeRange.min}, maksymalna - ${this.sizeRange.max}):`
      );
      size = parseInt(input);

      if (!size || size < this.sizeRange.min || size > this.sizeRange.max) {
        alert("Wprowadź poprawną wartość!");
      }
    }

    return size;
  };

  handleSetBoardSize = () => {
    this.boardSize = this.handleValidateBoardSize();
  };

  handleAppendBoard = (tileCSS) => {
    let tilesQty = 0;

    for (let i = 0; i < this.boardSize; i++) {
      let row = [];
      for (let j = 0; j < this.boardSize; j++) {
        let tile = document.createElement("div");

        tile.classList.add("tile");
        tile.style.width = `${tileCSS.width - 2}px`;
        tile.style.height = `${tileCSS.height - 2}px`;

        this.gameBoard.appendChild(tile);
        const tileQuery = document.querySelectorAll(".tile");

        row.push(tileQuery[tilesQty]);

        tilesQty++;
      }
      this.board.push(row);
    }
  };

  handleAppendSnake = () => {
    for (let i = 0; i < this.snake.length; i++) {
      let snakePos = {
        x: this.snake.x,
        y: this.snake.y + i,
      };

      this.snakePositions.unshift({ x: snakePos.x, y: snakePos.y });

      let snakeEl = this.board[this.snake.y + i][this.snake.x];
      snakeEl.classList.add("tile--snake");
    }
  };

  getTileCSS = () => {
    return {
      width: this.gameBoard.clientWidth / this.boardSize,
      height: this.gameBoard.clientHeight / this.boardSize,
    };
  };

  handleDisplay = ({ snakeLength, speed, timer, boardSize }) => {
    if (speed) this.parameterSpeed.textContent = `${speed}`;
    if (snakeLength) this.length.textContent = `${snakeLength}`;
    if (boardSize)
      this.size.textContent = `Rozmiar planszy: ${this.boardSize}x${this.boardSize}`;
    if (timer)
      this.time.textContent = `Czas gry: 
      ${
        Math.floor(this.timer / 60 / 60) < 10
          ? "0" + Math.floor(this.timer / 60 / 60)
          : Math.floor(this.timer / 60 / 60)
      }:${
        Math.floor(this.timer / 60) % 60 < 10
          ? "0" + (Math.floor(this.timer / 60) % 60)
          : Math.floor(this.timer / 60) % 60
      }:${this.timer % 60 < 10 ? "0" + (this.timer % 60) : this.timer % 60}
      `;
  };

  handleGenerateBoard = () => {
    this.audio.handleInitializeAudio();

    // TODO: generowanie planszy
    let snakePos = {
      x: this.Rand.GetInteger({
        min: Math.floor(this.boardSize / 2) - 3,
        max: Math.floor(this.boardSize / 2) + 3,
      }),
      y: this.Rand.GetInteger({
        min: Math.floor(this.boardSize / 2) - 1,
        max: Math.floor(this.boardSize / 2) + 1,
      }),
    };

    this.snake = new Snake(
      null,
      Math.round(boardSize / 3),
      1,
      snakePos.x,
      snakePos.y
    );

    timer = 0;

    this.handleDisplay({
      boardSize: this.boardSize,
      speed: this.snake.speed.toFixed(2),
      snakeLength: this.snake.length,
      timer: `${this.timer}`,
    });

    let tileCSS = this.getTileCSS();

    this.handleAppendBoard(tileCSS);
    this.handleAppendSnake();

    this.handlePlaceTile({ mode: "food" });
  };

  handlePlaceTile = ({ mode, bonus }) => {
    if (mode === "bonus") {
      // do something if bonus === 'bonus'
      let newBonus;
      if (bonus)
        newBonus = new Bonus(
          0,
          0,
          bonus.name,
          this.bonuses.length,
          bonus.imgPATH,
          bonus.audioPATH
        );

      const freeTiles = [];

      this.board[0].forEach((bonus, index) => {
        if (!bonus.classList.contains("tile--boost")) {
          freeTiles.push(index);
        }
      });

      if (freeTiles.length === 0) return;

      let rand = this.Rand.GetInteger({
        min: 0,
        max: freeTiles.length - 1,
      });

      this.board[0][freeTiles[rand]].classList.add("tile--boost");
      this.board[0][
        freeTiles[rand]
      ].style.backgroundImage = `url('${newBonus.imgPATH}')`;

      newBonus.x = freeTiles[rand];

      this.bonuses.push(newBonus);

      return;
    }

    const tiles = document.querySelectorAll(".tile");
    const freeTiles = document.querySelectorAll(".tile:not(.tile--snake)");

    if (freeTiles.length === 0) {
      this.gameOver();
      return;
    }

    const randTileId = RandInt({ min: 0, max: freeTiles.length - 1 });

    const indexOfFreeTile = Array.from(tiles).indexOf(freeTiles[randTileId]);
    const tileCoordinates = {
      x: indexOfFreeTile % this.boardSize,
      y: Math.floor(indexOfFreeTile / this.boardSize),
    };

    const { x, y } = tileCoordinates;

    // mark food or bonus on the board
    switch (mode) {
      case "food":
        this.food = new Food(x, y);

        board[this.food.y][this.food.x].classList.add("tile--food");
        break;
      case "bomb":
        let rand = this.Rand.GetInteger({
          min: 0,
          max: this.boardSize - 1,
        });

        board[rand][this.boardSize - 1].classList.add("tile--bomb");

        const bomb = new Bomb(this.boardSize - 1, rand);
        break;
      default:
        console.error("#ERR! -> Przesłano niepoprawny typ bonusu");
        break;
    }
  };

  constructor() {}
}

export default Board;
