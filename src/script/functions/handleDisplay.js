import { length, parameterSpeed, size, time } from "../global/elements.js";

const handleDisplay = ({ snakeLength, speed, timer, boardSize }) => {
  if (speed) parameterSpeed.textContent = `${speed}`;
  if (snakeLength) length.textContent = `${snakeLength}`;
  if (boardSize)
    size.textContent = `Rozmiar planszy: ${boardSize}x${boardSize}`;
  if (timer)
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
