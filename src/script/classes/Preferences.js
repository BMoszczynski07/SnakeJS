import Game from "./Game.js";

class Preferences extends Game {
  root = document.querySelector(":root");
  rs = getComputedStyle(root);

  CSS = {
    "--board-color": rs.getPropertyValue("--board-color"),
    "--snake-color": rs.getPropertyValue("--snake-color"),
    "--tile-color": rs.getPropertyValue("--tile-color"),
    "--background": rs.getPropertyValue("--background"),
    "--food-color": rs.getPropertyValue("--food-color"),
    "--text-color": rs.getPropertyValue("--text-color"),
  };

  currentTheme = {
    boardColor: localStorage.getItem("board-theme") || CSS["--board-color"],
    snakeColor: localStorage.getItem("snake-color") || CSS["--snake-color"],
    tileColor: localStorage.getItem("tile-color") || CSS["--tile-color"],
    foodColor: localStorage.getItem("food-color") || CSS["--food-color"],
    background: localStorage.getItem("background") || CSS["--background"],
  };

  constructor() {
    this.root.style.setProperty("--board-color", currentTheme.boardColor);
    this.root.style.setProperty("--text-color", currentTheme.textColor);
    this.root.style.setProperty("--snake-color", currentTheme.snakeColor);
    this.root.style.setProperty("--background", currentTheme.background);
    this.root.style.setProperty("--food-color", currentTheme.foodColor);
    this.root.style.setProperty("--tile-color", currentTheme.tileColor);
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

    this.root.style.setProperty("--board-color", boardColor);
    this.root.style.setProperty("--text-color", textColor);
    this.root.style.setProperty("--snake-color", snakeColor);
    this.root.style.setProperty("--background", background);
    this.root.style.setProperty("--food-color", foodColor);
    this.root.style.setProperty("--tile-color", tileColor);
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

      this.root.style.setProperty("--tile-color", `${state ? "#fff" : "#000"}`);
      this.root.style.setProperty(
        "--snake-color",
        `${state ? "#000" : "#fff"}`
      );
      this.root.style.setProperty("--food-color", `${state ? "#f00" : "#00f"}`);
    }, 50);

    setTimeout(() => {
      this.root.style.setProperty("--snake-color", currentTheme.snakeColor);
      this.root.style.setProperty("--tile-color", currentTheme.tileColor);
      this.root.style.setProperty("--food-color", currentTheme.foodColor);
      clearInterval(nystagmusInterval);
    }, 4000);
  };
}

export default Preferences;
