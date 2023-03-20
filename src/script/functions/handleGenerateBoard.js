import handleInitializeAudio from "./handleInitializeAudio.js";

export const handleAppendBoard = () => {
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
  for (i = 0; i < snake.length; i++) {
    let snakePos = {
      x: snake.x,
      y: snake.y + i,
    };

    snakePositions.unshift({ x: snakePos.x, y: snakePos.y });

    let snakeEl = board[snake.y + i][snake.x];
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

  snake = new Snake(null, Math.round(boardSize / 3), 1, snakePos.x, snakePos.y);

  handleDisplay({
    boardSize,
    speed: snake.speed.toFixed(2),
    length: snake.length,
  });

  let tileCSS = getTileCSS();

  handleAppendBoard();
  handleAppendSnake();

  handlePlaceTile({ mode: "food" });
};

export default handleGenerateBoard;
