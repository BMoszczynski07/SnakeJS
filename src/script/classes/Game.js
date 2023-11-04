import AudioComponent from "./AudioComponent.js";
import Board from "./Board.js";
import Preferences from "./Preferences.js";

class Game {
  selection = document.querySelector(".leaderboard-selection");
  mode = localStorage.getItem("leaderboard-mode") || "all-records";

  audio = "";
  preferences = "";

  constructor() {
    const board = new Board();
    this.audio = new AudioComponent();
    this.preferences = new Preferences();

    board.handleSetBoardSize();

    const options = selection.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.textContent === mode) {
        option.selected = true;
        break;
      }
    }
  }
}

export default Game;
