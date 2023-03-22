import handleValidateBoardSize from "../functions/handleValidateBoardSize.js";

// board variables
export const board = [];
export const sizeRange = { min: 10, max: 50 };
export let boardSize = handleValidateBoardSize();

// classes
export let snake;
export let food;
export const bonuses = [];

// checks whether the game has already started
export let gameStarted = false;

// contains positions of all snake's tiles
export const snakePositions = [];

export let timer = 0;
export let mute = false;
export let interval;

// intervals
export let gameInterval;
export let timerInterval;

// speed constant (used for snake intervals)
export const SPEED_CONSTANT = 4;

// checks whether the snake has moved since last set direction
export let snakeDidMove = false;

const VariableSetter = ({ variable, value }) => {};

export default VariableSetter;
