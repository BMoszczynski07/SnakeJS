import {
  gameInterval,
  gameStarted,
  interval,
  timerInterval,
} from "../global/variables.js";

const handleStartGame = () => {
  gameStarted.val = true;

  if (!mute) {
    start.play();
  }

  interval = 750 / (boardSize / sizeRange.max) / SPEED_CONSTANT / snake.speed;

  gameInterval = setInterval(handleJump, interval);

  timerInterval = setInterval(() => {
    if (!mute) {
      jump.play();
    }

    timer++;
    handleDisplay({ timer });
  }, 1000);
};

export default handleStartGame;
