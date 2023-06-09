import { root } from "../global/CSSroot.js";

class Preferences {
  constructor(board) {
    this.board = board;

    root.style.setProperty("--board-color", this.board.boardColor);
    root.style.setProperty("--text-color", this.board.textColor);
    root.style.setProperty("--snake-color", this.board.snakeColor);
    root.style.setProperty("--background", this.board.background);
    root.style.setProperty("--food-color", this.board.foodColor);
    root.style.setProperty("--tile-color", this.board.tileColor);
  }

  handlePickTheme = ({ theme }) => {
    const {
      textColor,
      boardColor,
      tileColor,
      background,
      foodColor,
      snakeColor,
    } = theme;

    root.style.setProperty("--board-color", boardColor);
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--snake-color", snakeColor);
    root.style.setProperty("--background", background);
    root.style.setProperty("--food-color", foodColor);
    root.style.setProperty("--tile-color", tileColor);
    localStorage.setItem("--board-color", boardColor);
    localStorage.setItem("--text-color", textColor);
    localStorage.setItem("--snake-color", snakeColor);
    localStorage.setItem("--background", background);
    localStorage.setItem("--food-color", foodColor);
    localStorage.setItem("--tile-color", tileColor);
  };

  handleNystagmus = () => {
    let nystagmusInterval;
    let state = false;

    nystagmusInterval = setInterval(() => {
      state = !state;

      root.style.setProperty("--tile-color", `${state ? "#fff" : "#000"}`);
      root.style.setProperty("--snake-color", `${state ? "#000" : "#fff"}`);
      root.style.setProperty("--food-color", `${state ? "#f00" : "#00f"}`);
    }, 50);

    setTimeout(() => {
      root.style.setProperty("--snake-color", this.board.snakeColor);
      root.style.setProperty("--tile-color", this.board.tileColor);
      root.style.setProperty("--food-color", this.board.foodColor);
      clearInterval(nystagmusInterval);
    }, 4000);
  };
}

export default Preferences;
