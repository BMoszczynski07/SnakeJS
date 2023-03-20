export const boardThemesList = [
  {
    boardTheme: "#dbdbdb",
    snakeColor: "#666666",
    foodColor: "#c4c415",
  },
];

export const mainThemes = [];

let preferences = {
  board: {
    boardTheme: localStorage.getItem("board-theme") || "black",
    snakeColor: localStorage.getItem("snake-color") || "white",
    foodColor: localStorage.getItem("food-color") || "yellow",

    handlePickPreference: () => {},
  },
  theme: {
    background: localStorage.getItem("background") || "white",
    glow: localStorage.getItem("glow") || false,

    handlePickPreference: () => {},
  },
  muted: localStorage.getItem("game-muted") || false,
};

export default preferences;
