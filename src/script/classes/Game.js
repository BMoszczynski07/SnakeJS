import AudioComponent from "./AudioComponent.js";
import Board from "./Board.js";
import Leaderboard from "./LeaderBoard.js";
import Preferences from "./Preferences.js";

class Game {
  selection = document.querySelector(".leaderboard-selection");
  mode = localStorage.getItem("leaderboard-mode") || "all-records";

  gameStarted = false;

  audio = "";
  preferences = "";
  leaderboard = "";

  constructor() {
    const board = new Board();
    this.audio = new AudioComponent();

    this.preferences = new Preferences();
    this.leaderboard = new Leaderboard();

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
