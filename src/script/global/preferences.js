import { gameBoard } from "./elements.js";

export const boardThemesList = {
  default: {
    boardTheme: "#dbdbdb",
    snakeColor: "#666666",
    foodColor: "#c4c415",
    backgroundColor: "#fff",
    glow: false,
  },
};

let preferences = {
  board: {
    boardTheme: localStorage.getItem("board-theme") || "#dbdbdb",
    snakeColor: localStorage.getItem("snake-color") || "#666666",
    foodColor: localStorage.getItem("food-color") || "#c4c415",
    background: localStorage.getItem("background") || "#fff",
    glow: localStorage.getItem("glow") || false,

    handlePickTheme: ({ theme }) => {},

    handleNystagmus: () => {
      let nystagmusInterval;
      let state = false;
      let snake = document.querySelectorAll(".tile--snake");

      nystagmusInterval = setInterval(() => {
        state = !state;

        gameBoard.style.backgroundColor = state ? "#000" : "#fff";
        snake.style.backgroundColor = state ? "#fff" : "#000";
      });

      setTimeout(() => {
        gameBoard.style.backgroundColor = preferences.board.boardTheme;
        snake.style.backgroundColor = preferences.board.snakeColor;

        clearInterval(nystagmusInterval);
      }, 2000);
    },
  },
  muted: {
    isMuted: localStorage.getItem("game-muted") || false,
    toggle: () => {
      preferences.muted.isMuted = !preferences.muted.isMuted;
    },
  },
};

export default preferences;
