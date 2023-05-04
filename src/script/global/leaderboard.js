export const topPlayers = [
  {
    username: "Bartosz Moszczyński",
    imgURL: "https://tiny.pl/wzmff",
    statistics: {
      points: 68400,
      speed: 1,
      boardSize: 20,
      length: 40,
      time: {
        hours: 0,
        minutes: 2,
        seconds: 36,
      },
    },
  },
];

export const handleLoadRecords = () => {
  // TODO: fetch some records from the API and store them into topPlayers[] array
};

export const calculatePos = () => {
  // TODO: map through all the records and return the position of the player
};

export const sharePos = (e) => {
  // TODO: add position to the DOM and a table, and then do PATCH request to the API (this will be form submit function)
  e.preventDefault();
};
