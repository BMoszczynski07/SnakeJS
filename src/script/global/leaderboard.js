export const topPlayers = [
  {
    username: "Bartosz Moszczyński",
    message: "łatwa gierka ez",
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
    published: {
      year: 2023,
      month: 5,
      day: 1,
    },
  },
  {
    username: "Bartosz Moszczyński",
    message: "hihihiha",
    imgURL: "https://tiny.pl/wzmff",
    statistics: {
      points: 65400,
      speed: 3,
      boardSize: 40,
      length: 60,
      time: {
        hours: 0,
        minutes: 3,
        seconds: 24,
      },
    },
    published: {
      year: 2023,
      month: 4,
      day: 29,
    },
  },
  {
    username: "Bartosz Moszczyński",
    message: "",
    imgURL: "https://tiny.pl/wzmff",
    statistics: {
      points: 62400,
      speed: 2,
      boardSize: 20,
      length: 40,
      time: {
        hours: 0,
        minutes: 3,
        seconds: 24,
      },
    },
    published: {
      year: 2023,
      month: 5,
      day: 2,
    },
  },
];

export const handleLoadRecords = () => {
  // TODO: fetch some records from the API and store them into topPlayers[] array
};

export const calculatePos = () => {
  // TODO: fetch the position of the player from the API using endpoint '/api/user/get-pos'
};

export const sharePos = (e) => {
  // TODO: add position to the DOM and a table, and then do PATCH request to the API (this will be form submit function)
  e.preventDefault();
};
