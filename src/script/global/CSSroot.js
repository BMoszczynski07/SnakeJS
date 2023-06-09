export const root = document.querySelector(":root");
export const rs = getComputedStyle(root);

export const CSS = {
  "--board-color": rs.getPropertyValue("--board-color"),
  "--snake-color": rs.getPropertyValue("--snake-color"),
  "--tile-color": rs.getPropertyValue("--tile-color"),
  "--background": rs.getPropertyValue("--background"),
  "--food-color": rs.getPropertyValue("--food-color"),
  "--text-color": rs.getPropertyValue("--text-color"),
};

export let currentTheme = {
  boardColor: localStorage.getItem("board-theme") || CSS["--board-color"],
  snakeColor: localStorage.getItem("snake-color") || CSS["--snake-color"],
  tileColor: localStorage.getItem("tile-color") || CSS["--tile-color"],
  foodColor: localStorage.getItem("food-color") || CSS["--food-color"],
  background: localStorage.getItem("background") || CSS["--background"],
};
