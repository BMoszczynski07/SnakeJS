import AudioComponent from "./AudioComponent.js";
import Board from "./Board.js";
import Leaderboard from "./LeaderBoard.js";
import Preferences from "./Preferences.js";

class Game {
  gameStarted = false;

  audio = "";
  preferences = "";

  leaderboard = "";
  board = "";

  constructor() {
    this.audio = new AudioComponent();

    this.preferences = new Preferences();

    this.leaderboard = new Leaderboard();
    this.board = new Board();

    this.leaderboard.initSelector();

    this.board.handleSetBoardSize();
  }
}

export default Game;
