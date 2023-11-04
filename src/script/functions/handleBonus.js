import preferences from "../global/preferences.js";
import {
  board,
  boardSize,
  gameStarted,
  snake,
  snakePositions,
} from "../global/variables.js";
import handleDisplay from "./handleDisplay.js";
import handleFoodEaten from "./handleFoodEaten.js";
import handlePlaceTile from "./handlePlaceTile.js";
import { bombsInterval, bombsState } from "../global/bombs.js";
