const handleUpdateSnake = () => {
  switch (snake.direction) {
    case "W":
      snake.y = snake.y === 0 ? boardSize - 1 : snake.y - 1;

      handleMoveSnake();
      break;
    case "S":
      snake.y = snake.y === boardSize - 1 ? 0 : snake.y + 1;

      handleMoveSnake();
      break;
    case "A":
      snake.x = snake.x === 0 ? boardSize - 1 : snake.x - 1;

      handleMoveSnake();
      break;
    case "D":
      snake.x = snake.x === boardSize - 1 ? 0 : snake.x + 1;

      handleMoveSnake();
      break;
    default:
      console.error("#ERR: Nieprawidłowy kierunek!");
      break;
  }
};

export default handleUpdateSnake;
