import POINT_SRC from "../../assets/point.mp3";
import GAME_OVER_SRC from "../../assets/gameover.wav";
import SNAKESPEED_SRC from "../../assets/speed_acceleration.wav";
import JUMP_SRC from "../../assets/jump.wav";
import START_SRC from "../../assets/start.wav";
import BOMB_SRC from "../../assets/explosion.wav";
import { bonusFiles } from "../global/bonuses.js";

export const start = new Audio();
export const jump = new Audio();
export const snakespeed = new Audio();
export const point = new Audio();
export const gameOver = new Audio();
export const bonus = new Audio();
export const bomb = new Audio();

const handleInitializeAudio = () => {
  point.src = POINT_SRC;
  gameOver.src = GAME_OVER_SRC;
  snakespeed.src = SNAKESPEED_SRC;
  jump.src = JUMP_SRC;
  start.src = START_SRC;
  bomb.src = BOMB_SRC;
  bomb.volume = 1;

  start.volume = 0.07;
  jump.volume = 0.1;
  point.volue = 0.07;
  snakespeed.volume = 0.3;
  gameOver.volume = 0.3;
  bonus.volume = 0.1;
};

export default handleInitializeAudio;
