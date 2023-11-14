import Board from "./Board.js";

class ResultForm extends Board {
  gameover = document.querySelector(".game-over");
  container = document.querySelector(".container");

  playAgain = document.querySelector(".play-again");
  pencil = document.querySelector(".pencil");
  shareForm = document.querySelector(".gameover-form");

  pointsEl = document.querySelector("[data-points]");
  speedEl = document.querySelector("[data-speed]");
  lengthEl = document.querySelector("[data-length]");
  boardSizeEl = document.querySelector("[data-boardSize]");
  timerEl = document.querySelector("[data-timer]");

  usernameInput = document.querySelector("[data-username-input]");

  constructor() {}

  calculatePos = () => {};

  show = () => {
    this.container.style.display = "flex";
    this.gameover.style.display = "flex";

    this.calculatePos();

    this.pointsEl.textContent = `${payload.totalPoints} Punkty`;
    this.speedEl.textContent = `${payload.speed.toFixed(2)} Prędkość`;
    this.lengthEl.textContent = `${payload.length} Długość`;
    this.boardSizeEl.textContent = `${payload.boardSize}x${payload.boardSize} Rozmiar`;
    this.timerEl.textContent = `${
      payload.time.hours > 10 ? payload.time.hours : "0" + payload.time.hours
    }:${
      payload.time.minutes > 10
        ? payload.time.minutes
        : "0" + payload.time.minutes
    }:${
      payload.time.seconds > 10
        ? payload.time.seconds
        : "0" + payload.time.seconds
    } Czas gry`;

    this.shareForm.addEventListener("submit", sharePos);

    this.playAgain.addEventListener("click", this.handlePlayAgain);
    this.pencil.addEventListener("click", this.usernameInputFocus);
  };

  hide = () => {
    this.container.style.display = "none";
    this.gameover.style.display = "none";

    this.shareForm.addEventListener("submit", (e) => {
      this.leaderboard.insertResult(e);
    });

    this.playAgain.removeEventListener("click", this.handlePlayAgain);
    this.pencil.removeEventListener("click", this.usernameInputFocus);
  };

  usernameInputFocus = () => {
    this.usernameInput.focus();
  };
}

export default ResultForm;
