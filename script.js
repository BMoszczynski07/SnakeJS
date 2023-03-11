class Snake {
  constructor(direction, length, speed, x, y) {
    this.direction = direction;
    this.length = length;
    this.speed = speed;
    this.x = x;
    this.y = y;
  }

  //   handleChangePosition() {}

  //   handleIncreaseSpeed() {}
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //   handleFoodEaten() {}
}

let board;
let boardSize;
let sizeRange = { min: 10, max: 60 };

let snake;
let food;

let timer = 0;
let mute = false;

let gameInterval;

let theme = "black";

const time = document.querySelector(".parameter[data-parameter=time]");
const size = document.querySelector(".parameter[data-parameter=board-size]");
const speed = document.querySelector(".parameter[data-parameter=speed]");

const topBtn = document.querySelector(".control[data-direction=top]");
const bottomBtn = document.querySelector(".control[data-direction=bottom]");
const leftBtn = document.querySelector(".control[data-direction=left]");
const rightBtn = document.querySelector(".control[data-direction=right]");

const gameBoard = document.querySelector(".gameboard");

const sound = document.querySelector(".sound");

while (!boardSize || boardSize < sizeRange.min || boardSize > sizeRange.max) {
  boardSize = prompt(
    "Podaj wielkość planszy (minimalna - 10, maksymalna - 60)"
  );
}

const handleGenerateBoard = () => {
  // TODO: generowanie planszy
  board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => document.createElement("div"))
  );

  let tileCSS = {
    width: gameBoard.clientWidth / boardSize,
    height: gameBoard.clientHeight / boardSize,
  };

  console.log(tileCSS);

  for (let i = 0; i < boardSize * boardSize; i++) {
    let tile = document.createElement("div");

    tile.classList.add("tile");
    tile.style.width = `${tileCSS.width}px`;
    tile.style.height = `${tileCSS.height}px`;

    board.push(tile);
    gameBoard.appendChild(tile);
  }
};

const handleStartGame = () => {
  snake = new Snake("top", 3, 1);
  timer = 0;

  size.textContent = `Rozmiar planszy: ${boardSize}x${boardSize}`;
  speed.textContent = `Prędkość: ${snake.speed.toFixed(2)}`;

  handleGenerateBoard();

  gameInterval = setInterval(() => {
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

document.addEventListener("DOMContentLoaded", handleStartGame);

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
