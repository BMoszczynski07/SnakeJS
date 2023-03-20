const handleDisplay = ({ snakeLength, speed, timer, boardSize }) => {
  if (speed) parameterSpeed.textContent = `Prędkość ${speed}`;
  else if (snakeLength) length.textContent = `Długość: ${snakeLength}`;
  else if (boardSize)
    size.textContent = `Rozmiar planszy: ${boardSize}x${boardSize}`;
  else if (time)
    time.textContent = `Czas gry: 
    ${
      Math.floor(timer / 60 / 60) < 10
        ? "0" + Math.floor(timer / 60 / 60)
        : Math.floor(timer / 60 / 60)
    }:${
      Math.floor(timer / 60) % 60 < 10
        ? "0" + (Math.floor(timer / 60) % 60)
        : Math.floor(timer / 60) % 60
    }:${timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
    `;
};

export default handleDisplay;
