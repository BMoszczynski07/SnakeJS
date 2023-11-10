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
