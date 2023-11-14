import AudioComponent from "./AudioComponent.js";
import Board from "./Board.js";
import BonusFiles from "./BonusFiles.js";
import Leaderboard from "./LeaderBoard.js";
import Preferences from "./Preferences.js";
import Random from "./Random.js";

class Game {
  gameStarted = false;

  audio = new AudioComponent();
  bonusFiles = new BonusFiles();

  preferences = new Preferences();

  leaderboard = new Leaderboard();
  board = new Board();

  Rand = new Random();

  sound = document.querySelector(".sound");

  constructor() {
    this.leaderboard.initSelector();

    this.board.handleSetBoardSize();

    this.board.handleGenerateBoard();
  }

  handleStartGame = () => {
    this.gameStarted = true;

    if (!this.audio.mute) {
      start.play();
    }

    const { snake } = this.board;

    this.board.interval =
      750 /
      (this.boardSize / this.sizeRange.max) /
      this.board.SPEED_CONSTANT /
      snake.speed;

    this.board.gameInterval = setInterval(
      snake.handleJump,
      this.board.interval
    );

    this.board.timerInterval = setInterval(() => {
      if (!this.audio.mute) {
        this.audio.jump.play();
      }

      this.board.timer++;
      this.board.handleDisplay({ timer: this.board.timer });
    }, 1000);
  };

  handleKeyPress = ({ key }) => {
    if (key === "M") {
      this.audio.mute = !this.audio.mute;
      this.sound.classList.toggle("sound--muted");
      return;
    }

    const { snake } = this.board;

    if (
      (key === "W" && snake.direction === "S") ||
      (key === "S" && snake.direction === "W") ||
      (key === "A" && snake.direction === "D") ||
      (key === "D" && snake.direction === "A")
    )
      return;

    if (!this.gameStarted && snake.jumps === 0) {
      if (key === "S") {
        this.board.snakePositions.reverse();
        snake.y =
          this.board.snakePositions[this.board.snakePositions.length - 1].y;
      }

      snake.direction = key;

      this.handleStartGame();
    }

    if (this.gameStarted && snake.snakeDidMove) {
      snake.snakeDidMove = false;
      snake.direction = key;
    }
  };
}

export default Game;
