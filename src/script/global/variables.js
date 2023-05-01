import handleValidateBoardSize from "../functions/handleValidateBoardSize.js";

// board variables
export const board = [];
export const sizeRange = { min: 10, max: 40 };
export let boardSize = 20;

// classes
export let snake = {
  class: "",
  set: ({ payload, attr }) => {
    if (attr) {
      snake.class[attr] = payload;
      return;
    }

    snake.class = payload;
  },
};
export let food = {
  class: "",
  set: ({ payload, attr }) => {
    if (attr) {
      food.class[attr] = payload;
      return;
    }

    food.class = payload;
  },
};

// checks whether the game has already started
export let gameStarted = {
  val: false,
  set: (value) => {
    gameStarted.val = value;
  },
};

// contains positions of all snake's tiles
export const snakePositions = [];

export let timer = {
  time: 0,
  increment: () => {
    timer.time++;
  },
};

export let mute = {
  isMuted: false,
  toggle: () => {
    mute.isMuted = !mute.isMuted;
  },
};
export let interval = {
  val: 0,
  set: (payload) => {
    interval.val = payload;
  },
};

// intervals
export let gameInterval = {
  interval: "",
  set: (func) => {
    gameInterval.interval = func;
  },
};
export let timerInterval = {
  interval: "",
  set: (func) => {
    timerInterval.interval = func;
  },
};

// speed constant (used for snake intervals)
export const SPEED_CONSTANT = 4;

// checks whether the snake has moved since last set direction
export let snakeDidMove = {
  state: false,
  set: (state) => {
    snakeDidMove.state = state;
  },
};
