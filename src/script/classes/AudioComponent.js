import Game from "./Game.js";

import POINT_SRC from "../../assets/point.mp3";
import GAME_OVER_SRC from "../../assets/gameover.wav";
import SNAKESPEED_SRC from "../../assets/speed_acceleration.wav";
import JUMP_SRC from "../../assets/jump.wav";
import START_SRC from "../../assets/start.wav";
import BOMB_SRC from "../../assets/bombs.wav";

class AudioComponent extends Game {
  mute = false;

  start = new Audio();
  jump = new Audio();
  snakespeed = new Audio();
  point = new Audio();
  gameOver = new Audio();
  bonus = new Audio();
  bomb = new Audio();

  handleInitializeAudio = () => {
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
}

export default AudioComponent;
