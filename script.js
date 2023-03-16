class Snake {
  constructor(direction, length, speed, x, y, jumps = 0) {
    this.direction = direction;
    this.length = length;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.jumps = jumps;
    this.endOfSnake = this.y + this.length - 1;
  }
}

class Boost {
  constructor(x, y, name = "") {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  handleIsEaten = () => {};
}

class Food extends Boost {}

class Bonus extends Boost {
  handleTransformBonus = () => {};
}

let board;
let boardSize;
let sizeRange = { min: 10, max: 60 };

let snake;
let food;
let bonuses = [];

let isGameStarted = false;

let timer = 0;
let mute = false;

let gameInterval;
let timerInterval;

let preferences = {
  bgTheme: "black",
  snakeColor: "white",
};

const start = new Audio();
const jump = new Audio();
const snakespeed = new Audio();

const time = document.querySelector(".parameter[data-parameter=time]");
const size = document.querySelector(".parameter[data-parameter=board-size]");
const speed = document.querySelector(".parameter[data-parameter=speed]");

const topBtn = document.querySelector(".control[data-direction=top]");
const bottomBtn = document.querySelector(".control[data-direction=bottom]");
const leftBtn = document.querySelector(".control[data-direction=left]");
const rightBtn = document.querySelector(".control[data-direction=right]");

const gameBoard = document.querySelector(".gameboard");

const sound = document.querySelector(".sound");

const parameterSpeed = document.querySelector(".parameter-speed");

while (!boardSize || boardSize < sizeRange.min || boardSize > sizeRange.max) {
  boardSize = prompt(
    "Podaj wielkość planszy (minimalna - 10, maksymalna - 60)"
  );
}

handleUpdateSnake = () => {
  if (snake.jumps === 0 && snake.direction === "bottom") {
    let end = snake.endOfSnake;
    snake.endOfSnake = snake.y;
    snake.y = end;
  }

  switch (snake.direction) {
    case "top":
      snake.y = snake.y === 0 ? boardSize - 1 : snake.y - 1;

      board[snake.endOfSnake][snake.x].classList.remove("tile--snake");
      board[snake.y][snake.x].classList.add("tile--snake");

      snake.endOfSnake =
        snake.endOfSnake === 0 ? boardSize - 1 : snake.endOfSnake - 1;
      break;
    case "bottom":
      snake.y = snake.y === boardSize - 1 ? 0 : snake.y + 1;

      board[snake.endOfSnake][snake.x].classList.remove("tile--snake");
      board[snake.y][snake.x].classList.add("tile--snake");

      snake.endOfSnake =
        snake.endOfSnake === boardSize - 1 ? 0 : snake.endOfSnake + 1;
      break;
    case "left":
      break;
    case "right":
      snake.x = snake.x === boardSize - 1 ? 0 : snake.x + 1;

      board[snake.endOfSnake][snake.x].classList.remove("tile--snake");
      board[snake.y][snake.x].classList.add("tile--snake");

      snake.endOfSnake =
        snake.endOfSnake === 0 ? boardSize - 1 : snake.endOfSnake - 1;
      break;
    case "default":
      console.error("#ERR: Nieprawidłowy kierunek!");
      break;
  }
};

handleJump = () => {
  if (!mute) {
    jump.src = "./assets/jump.wav";
    jump.play();
  }

  handleUpdateSnake();

  snake.jumps++;

  for (const bonus of bonuses) bonus.handleTransformBonus();

  if (snake.jumps % (Math.floor(boardSize / 10) * 9) === 0) {
    snake.speed = snake.speed + 0.1;
    if (!mute) {
      snakespeed.src = "./assets/speed_acceleration.wav";
      snakespeed.play();
    }

    parameterSpeed.classList.add("parameter-speed--acceleration");
    parameterSpeed.textContent = `${snake.speed.toFixed(2)}`;

    setTimeout(() => {
      parameterSpeed.classList.remove("parameter-speed--acceleration");
    }, 1000);

    clearInterval(gameInterval);
    gameInterval = setInterval(handleJump, (1 / snake.speed) * 1000);
  }
};

const RandInt = ({ min, max }) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handlePlaceTile = ({ type }) => {
  const tiles = document.querySelectorAll(".tile");
  const freeTiles = document.querySelectorAll(".tile:not(.tile--snake)");

  const randTileId = RandInt({ min: 0, max: freeTiles.length - 1 });

  const indexOfFreeTile = Array.from(tiles).indexOf(freeTiles[randTileId]);
  const tileCoordinates = {
    x: indexOfFreeTile % boardSize,
    y: Math.floor(indexOfFreeTile / boardSize),
  };

  const { x, y } = tileCoordinates;

  // mark food or bonus on the board
  switch (type) {
    case "food":
      food = new Food(x, y);

      board[food.x][food.y].classList.add("tile--food");
      break;
    case "bonus":
      let bonus = new Bonus("bonus", x, y);

      bonuses.push(bonus);
      break;
    default:
      console.error("#ERR! -> Przesłano niepoprawny typ bonusu");
      break;
  }
};

const handleGenerateBoard = () => {
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

  snake = new Snake(
    "top",
    Math.round(boardSize / 3),
    1,
    snakePos.x,
    snakePos.y
  );
  timer = 0;

  size.textContent = `Rozmiar planszy: ${boardSize}x${boardSize}`;
  parameterSpeed.textContent = `${snake.speed.toFixed(2)}`;

  board = [];

  let tileCSS = {
    width: gameBoard.clientWidth / boardSize,
    height: gameBoard.clientHeight / boardSize,
  };

  let tilesQty = 0;

  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      let tile = document.createElement("div");

      tile.classList.add("tile");
      tile.style.width = `${tileCSS.width}px`;
      tile.style.height = `${tileCSS.height}px`;

      gameBoard.appendChild(tile);
      const tileQuery = document.querySelectorAll(".tile");

      row.push(tileQuery[tilesQty]);

      tilesQty++;
    }
    board.push(row);
  }

  for (i = 0; i < snake.length; i++) {
    let snakeEl = board[snake.y + i][snake.x];
    snakeEl.classList.add("tile--snake");
  }

  handlePlaceTile({ type: "food" });
};

const GameOver = () => {
  const payload = {
    score: snake.length,
    jumps,
    time: {
      hours: Math.floor(timer / 60 / 60),
      minutes: Math.floor(timer / 60) % 60,
      seconds: timer % 60,
    },
  };
};

const handleStartGame = () => {
  start.src = "./assets/start.wav";

  start.volume = 0.07;
  jump.volume = 0.1;
  snakespeed.volume = 0.3;

  if (!mute) start.play();

  gameInterval = setInterval(handleJump, 1000);

  timerInterval = setInterval(() => {
    timer++;
    time.textContent = `Czas gry: 
    ${
      Math.floor(timer / 60 / 60) < 10
        ? "0" + Math.floor(timer / 60 / 60)
        : Math.floor(timer / 60 / 60)
    }:${
      Math.floor(timer / 60) % 60 < 10
        ? "0" + (Math.floor(timer / 60) % 60)
        : Math.floor(timer / 60) % 60
    }:${timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
    `;
  }, 1000);
};

const handleKeyPress = ({ e, action }) => {
  const { keyCode } = e;

  if (action === "up") {
    const M = 77;

    if (keyCode === M) {
      mute = !mute;
      sound.classList.toggle("sound--muted");
      return;
    }

    const selectedEl = document.querySelector(".control--pressed");
    if (!selectedEl) return;
    selectedEl.classList.remove("control--pressed");
    return;
  }

  const W = 87;
  const A = 65;
  const S = 83;
  const D = 68;

  const top = 38;
  const bottom = 40;
  const left = 37;
  const right = 39;

  document
    .querySelectorAll(".control--pressed")
    .forEach((el) => el.classList.remove("control--pressed"));

  if (
    keyCode !== W &&
    keyCode !== A &&
    keyCode !== S &&
    keyCode !== D &&
    keyCode !== top &&
    keyCode !== bottom &&
    keyCode !== left &&
    keyCode !== right
  )
    return;

  if (timer === 0) handleStartGame();

  switch (keyCode) {
    case W:
    case top:
      topBtn.classList.add("control--pressed");
      snake.direction = "top";
      break;
    case A:
    case left:
      leftBtn.classList.add("control--pressed");
      snake.direction = "left";
      break;
    case S:
    case bottom:
      bottomBtn.classList.add("control--pressed");
      snake.direction = "bottom";
      break;
    case D:
    case right:
      rightBtn.classList.add("control--pressed");
      snake.direction = "right";
      break;
    default:
      console.error("#Nie rozpoznano przycisku!", keyCode);
      break;
  }
};

sound.addEventListener("click", () => {
  mute = !mute;
  sound.classList.toggle("sound--muted");
});

document.addEventListener("keydown", (e) => {
  handleKeyPress({ e, action: "down" });
});

document.addEventListener("keyup", (e) => {
  handleKeyPress({ e, action: "up" });
});

document.addEventListener("DOMContentLoaded", handleGenerateBoard);
