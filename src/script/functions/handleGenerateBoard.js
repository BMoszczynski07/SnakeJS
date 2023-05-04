import handleInitializeAudio from "./handleInitializeAudio.js";
import RandInt from "./RandInt.js";
import Snake from "../classes/Snake.js";
import {
  board,
  boardSize,
  snake,
  snakePositions,
  timer,
} from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import { gameBoard } from "../global/elements.js";
import handlePlaceTile from "./handlePlaceTile.js";

export const handleAppendBoard = (tileCSS) => {
  let tilesQty = 0;

  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      let tile = document.createElement("div");

      tile.classList.add("tile");
      tile.style.width = `${tileCSS.width - 2}px`;
      tile.style.height = `${tileCSS.height - 2}px`;

      gameBoard.appendChild(tile);
      const tileQuery = document.querySelectorAll(".tile");

      row.push(tileQuery[tilesQty]);

      tilesQty++;
    }
    board.push(row);
  }
};

export const handleAppendSnake = () => {
  for (let i = 0; i < snake.class.length; i++) {
    let snakePos = {
      x: snake.class.x,
      y: snake.class.y + i,
    };

    snakePositions.unshift({ x: snakePos.x, y: snakePos.y });

    let snakeEl = board[snake.class.y + i][snake.class.x];
    snakeEl.classList.add("tile--snake");
  }
};

export const getTileCSS = () => {
  return {
    width: gameBoard.clientWidth / boardSize,
    height: gameBoard.clientHeight / boardSize,
  };
};

const handleGenerateBoard = () => {
  handleInitializeAudio();

  // TODO: generowanie planszy
  let snakePos = {
    x: RandInt({
      min: Math.floor(boardSize / 2) - 3,
      max: Math.floor(boardSize / 2) + 3,
    }),
    y: RandInt({
      min: Math.floor(boardSize / 2) - 1,
      max: Math.floor(boardSize / 2) + 1,
    }),
  };

  snake.set({
    payload: new Snake(
      null,
      Math.round(boardSize / 3),
      1,
      snakePos.x,
      snakePos.y
    ),
  });

  timer.set({ payload: 0 });

  handleDisplay({
    boardSize,
    speed: snake.class.speed.toFixed(2),
    snakeLength: snake.class.length,
    timer: `${timer.time}`,
  });

  let tileCSS = getTileCSS();

  handleAppendBoard(tileCSS);
  handleAppendSnake();

  handlePlaceTile({ mode: "food" });
};

export default handleGenerateBoard;
