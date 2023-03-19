class Snake {
  constructor(direction, length, speed, x, y, jumps = 0) {
    this.direction = direction;
    this.length = length;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.jumps = jumps;
  }
}

class Boost {
  constructor(x, y, name = "") {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class Food extends Boost {
  handleIsEaten = () => {
    console.log("handleIsEaten", this.x, this.y, snake.x, snake.y);
    if (snake.x === this.x && snake.y === this.y) {
      if (!mute) {
        point.play();
      }

      console.log("eaten");
      board[this.y][this.x].classList.remove("tile--food");
      handlePlaceTile({ mode: "food" });

      snake.length++;
      length.textContent = `Długość: ${snake.length}`;
    }
  };
}

class Bonus extends Boost {
  handleTransformBonus = () => {};

  handleIsEaten = () => {};
}

let board;
let boardSize;
const sizeRange = { min: 10, max: 60 };

let snake;
let food;
const bonuses = [];

let gameStarted = false;

let snakePositions = [];

let timer = 0;
let mute = false;

let gameInterval;
let timerInterval;

let preferences = {
  bgTheme: "black",
  snakeColor: "white",
};

const SPEED_CONSTANT = 4;

const POINT_HREF = "./assets/point.mp3";

const start = new Audio();
const jump = new Audio();
const snakespeed = new Audio();
const point = new Audio();

point.src = POINT_HREF;

const time = document.querySelector("[data-parameter=time]");
const size = document.querySelector("[data-parameter=board-size]");
const parameterSpeed = document.querySelector("[data-parameter=speed]");
const length = document.querySelector("[data-parameter=length]");

const topBtn = document.querySelector("[data-direction=top]");
const bottomBtn = document.querySelector("[data-direction=bottom]");
const leftBtn = document.querySelector("[data-direction=left]");
const rightBtn = document.querySelector("[data-direction=right]");

const gameBoard = document.querySelector(".gameboard");

const sound = document.querySelector(".sound");

while (!boardSize || boardSize < sizeRange.min || boardSize > sizeRange.max) {
  boardSize = prompt(
    "Podaj wielkość planszy (minimalna - 10, maksymalna - 60)"
  );
}

const handleMoveSnake = () => {
  const { x, y } = snakePositions[0];

  food.handleIsEaten();

  board[snake.y][snake.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.x, y: snake.y });
  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
};

const handleUpdateSnake = () => {
  if (snake.jumps === 0 && snake.direction === "S") {
    snakePositions = snakePositions.reverse();
  }

  switch (snake.direction) {
    case "W":
      snake.y = snake.y === 0 ? boardSize - 1 : snake.y - 1;

      handleMoveSnake();
      break;
    case "S":
      snake.y = snake.y === boardSize - 1 ? 0 : snake.y + 1;

      handleMoveSnake();
      break;
    case "A":
      snake.x = snake.x === 0 ? boardSize - 1 : snake.x - 1;

      handleMoveSnake();
      break;
    case "D":
      snake.x = snake.x === boardSize - 1 ? 0 : snake.x + 1;

      handleMoveSnake();
      break;
    default:
      console.error("#ERR: Nieprawidłowy kierunek!");
      break;
  }
};

const handleJump = () => {
  snakeDidMove = true;

  snake.jumps++;

  handleUpdateSnake();

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

    let interval =
      750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.speed;

    clearInterval(gameInterval);
    gameInterval = setInterval(handleJump, interval);
  }
};

const RandInt = ({ min, max }) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handlePlaceTile = ({ mode }) => {
  const tiles = document.querySelectorAll(".tile");
  const freeTiles = document.querySelectorAll(
    ".tile:not(.tile--snake):not(.tile--boost)"
  );

  const randTileId = RandInt({ min: 0, max: freeTiles.length - 1 });

  const indexOfFreeTile = Array.from(tiles).indexOf(freeTiles[randTileId]);
  const tileCoordinates = {
    x: indexOfFreeTile % boardSize,
    y: Math.floor(indexOfFreeTile / boardSize),
  };

  // console.log(indexOfFreeTile % boardSize);

  const { x, y } = tileCoordinates;

  // mark food or bonus on the board
  switch (mode) {
    case "food":
      food = new Food(x, y);

      board[food.y][food.x].classList.add("tile--food");
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

  snake = new Snake(null, Math.round(boardSize / 3), 1, snakePos.x, snakePos.y);
  timer = 0;

  size.textContent = `Rozmiar planszy: ${boardSize}x${boardSize}`;
  parameterSpeed.textContent = `${snake.speed.toFixed(2)}`;
  length.textContent = `Długość: ${snake.length}`;

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
      tile.style.width = `${tileCSS.width - 2}px`;
      tile.style.height = `${tileCSS.height - 2}px`;

      gameBoard.appendChild(tile);
      const tileQuery = document.querySelectorAll(".tile");

      row.push(tileQuery[tilesQty]);

      tilesQty++;
    }
    board.push(row);
  }

  for (i = 0; i < snake.length; i++) {
    let snakePos = {
      x: snake.x,
      y: snake.y + i,
    };

    snakePositions.unshift({ x: snakePos.x, y: snakePos.y });

    let snakeEl = board[snake.y + i][snake.x];
    snakeEl.classList.add("tile--snake");
  }

  handlePlaceTile({ mode: "food" });
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
  point.volue = 0.2;
  snakespeed.volume = 0.3;
  jump.src = "./assets/jump.wav";

  gameStarted = true;

  if (!mute) {
    start.play();
  }

  let interval =
    750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.speed;

  gameInterval = setInterval(handleJump, interval);

  timerInterval = setInterval(() => {
    if (!mute) {
      jump.play();
    }

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

let snakeDidMove = false;

const handleKeyPress = ({ key }) => {
  if (key === "M") {
    mute = !mute;
    sound.classList.toggle("sound--muted");
    return;
  }

  if (
    (key === "W" && snake.direction === "S") ||
    (key === "S" && snake.direction === "W") ||
    (key === "A" && snake.direction === "D") ||
    (key === "D" && snake.direction === "A")
  )
    return;

  if (!gameStarted) {
    snake.direction = key;
    handleStartGame();
  }

  if (gameStarted && snakeDidMove) {
    snakeDidMove = false;
    snake.direction = key;
  }
};

sound.addEventListener("click", () => {
  mute = !mute;
  sound.classList.toggle("sound--muted");
});

let controlBtns = document.querySelectorAll(".control");

controlBtns.forEach((control, index) => {
  control.addEventListener("mousedown", () => {
    control.classList.add("control--pressed");
  });

  control.addEventListener("mouseup", () => {
    const controls = ["W", "S", "A", "D"];

    control.classList.remove("control--pressed");

    handleKeyPress({ key: controls[index] });
  });
});

const W = 87;
const A = 65;
const S = 83;
const D = 68;
const M = 77;

const topKey = 38;
const bottomKey = 40;
const leftKey = 37;
const rightKey = 39;

let key;

document.addEventListener("keydown", (e) => {
  let keyCode = e.keyCode || e.key || e.keyIdentifier;

  switch (keyCode) {
    case W:
    case topKey:
      controlBtns[0].classList.add("control--pressed");
      break;
    case S:
    case bottomKey:
      controlBtns[1].classList.add("control--pressed");

      break;
    case A:
    case leftKey:
      controlBtns[2].classList.add("control--pressed");

      break;
    case D:
    case rightKey:
      controlBtns[3].classList.add("control--pressed");

      break;

    default:
      return;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  let keyCode = e.keyCode || e.key || e.keyIdentifier;

  controlBtns.forEach((control) =>
    control.classList.remove("control--pressed")
  );

  switch (keyCode) {
    case W:
    case topKey:
      key = "W";

      break;
    case S:
    case bottomKey:
      key = "S";

      break;
    case A:
    case leftKey:
      key = "A";

      break;
    case D:
    case rightKey:
      key = "D";

      break;
    case M:
      key = "M";

      break;

    default:
      return;
      break;
  }

  handleKeyPress({ key });
});

document.addEventListener("DOMContentLoaded", handleGenerateBoard);
