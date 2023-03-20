const GameOver = () => {
  const payload = {
    score: snake.length,
    jumps: snake.jumps,
    time: {
      hours: Math.floor(timer / 60 / 60),
      minutes: Math.floor(timer / 60) % 60,
      seconds: timer % 60,
    },
  };

  clearInterval(timerInterval);
  clearInterval(gameInterval);

  if (!mute) gameOver.play();
};

export default GameOver;
