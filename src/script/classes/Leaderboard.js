import Game from "./Game.js";

class Leaderboard extends Game {
  topPlayers = [];

  selection = document.querySelector(".leaderboard-selection");

  leaderboardTop = document.querySelector(".leaderboard-top");

  mode = localStorage.getItem("leaderboard-mode") || "all-records";

  handleFetchRecords = async ({ from = 0, to = 50 }) => {
    // TODO: fetch some records from the API and store them into topPlayers[] array
    // fetching records from the API...

    // map through the records and store them in the leaderboard
    for (let i = from; i < to; i++) {
      if (i == this.topPlayers.length) break;

      const recordElem = handleCreateElement(i, this.topPlayers[i]);

      leaderboardTop.appendChild(recordElem);
    }
  };

  calculatePos = async () => {};

  insertResult = async (e) => {
    e.preventDefault();
  };

  initSelector = () => {
    const options = this.selection.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.textContent === this.mode) {
        option.selected = true;
        break;
      }
    }
  };

  constructor() {}
}

export default Leaderboard;
