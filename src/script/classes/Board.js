import RandInt from "../functions/RandInt.js";
import Bonus from "./Bonus.js";
import Food from "./Food.js";
import Game from "./Game.js";
import Snake from "./Snake.js";

class Board extends Game {
  board = [];
  sizeRange = { min: 10, max: 40 };
  boardSize = 20;
  gameBoard = document.querySelector(".gameboard");

  snakePositions = [];

  timer = 0;

  time = document.querySelector("[data-parameter=time]");
  size = document.querySelector("[data-parameter=board-size]");
  parameterSpeed = document.querySelector("[data-parameter=speed]");
  length = document.querySelector("[data-parameter=length]");

  snake = "";
  food = "";

  bonuses = [];

  handleSetBoardSize = () => {
    this.boardSize = handleValidateBoardSize();
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
      x: RandInt({
        min: Math.floor(this.boardSize / 2) - 3,
        max: Math.floor(this.boardSize / 2) + 3,
      }),
      y: RandInt({
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

      let rand = RandInt({
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
        let rand = RandInt({
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
