const handleInitializeAudio = () => {
  const start = new Audio();
  const jump = new Audio();
  const snakespeed = new Audio();
  const point = new Audio();
  const gameOver = new Audio();

  const POINT_SRC = "assets/point.mp3";
  const GAME_OVER_SRC = "assets/gameover.wav";
  const START_SRC = "assets/start.wav";
  const JUMP_SRC = "assets/jump.wav";
  const SNAKESPEED_SRC = "assets/snake_acceleration.wav";

  point.src = POINT_SRC;
  gameOver.src = GAME_OVER_SRC;
  snakespeed.src = SNAKESPEED_SRC;
  jump.src = JUMP_SRC;
  start.src = START_SRC;

  start.volume = 0.07;
  jump.volume = 0.1;
  point.volue = 0.2;
  snakespeed.volume = 0.3;
  gameOver.volume = 0.3;
};

export default handleInitializeAudio;
