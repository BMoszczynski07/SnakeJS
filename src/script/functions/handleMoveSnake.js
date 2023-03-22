const handleMoveSnake = () => {
  const { x, y } = snakePositions[0];
  if (board[snake.y][snake.x].classList.contains("tile--snake")) {
    GameOver();
    return;
  }
  board[snake.y][snake.x].classList.add("tile--snake");
  snakePositions.push({ x: snake.x, y: snake.y });
  board[y][x].classList.remove("tile--snake");
  snakePositions.shift();
  food.handleIsEaten();
};

export default handleMoveSnake;
