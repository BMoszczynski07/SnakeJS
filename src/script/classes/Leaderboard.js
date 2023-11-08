class Leaderboard extends Game {
  topPlayers = [];

  leaderboardTop = document.querySelector(".leaderboard-top");

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

  insertResult = async () => {};

  constructor() {}
}

export default Leaderboard;
