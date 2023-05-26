export const topPlayers = [
  {
    username: "Bartosz Moszczyński",
    message:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam nonumy euismod tempor",
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
    message: "lorem ipsum dolor sit amet",
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
    message: "lorem ipsum dolor sit amet",
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
  {
    username: "Hu Tao",
    message:
      '"Hu" as in: "Who put me in this coffin?", and Tao as in: "I cant get TAOt!" :D',
    imgURL: "https://wallpapercave.com/wp/wp11693252.jpg",
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

const leaderboardTop = document.querySelector(".leaderboard-top");

const handleCreateElement = (index, record) => {
  const { username, message, imgURL: profile_src, statistics } = record;
  const { time } = statistics;
  const { hours, minutes, seconds } = time;
  const { points, speed, boardSize } = statistics;

  const leaderboardRecord = document.createElement("div");
  leaderboardRecord.classList.add("leaderboard-record");
  const recordTrophy = document.createElement("div");
  recordTrophy.classList.add("leaderboard-record-trophy");
  const trophy = document.createElement("img");
  trophy.classList.add("leaderboard-trophy-img");
  const playerPos = document.createElement("div");
  playerPos.classList.add("leaderboard-position");
  const leaderboardInfo = document.createElement("div");
  leaderboardInfo.classList.add("leaderboard-info");
  const leaderboardProfile = document.createElement("div");
  leaderboardProfile.classList.add("leaderboard-profile");
  const leaderboardProfileImg = document.createElement("img");
  leaderboardProfileImg.classList.add("leaderboard-profile-img");
  const leaderboardUsername = document.createElement("div");
  leaderboardUsername.classList.add("leaderboard-username");
  const leaderboardMessage = document.createElement("div");
  leaderboardMessage.classList.add("leaderboard-message");
  const leaderboardMessageIcon = document.createElement("i");
  leaderboardMessageIcon.classList.add("fa-regular");
  leaderboardMessageIcon.classList.add("fa-message");
  const leaderboardMessageContent = document.createElement("h5");
  leaderboardMessageContent.classList.add("leaderboard-message-content");
  const leaderboardStatistics = document.createElement("div");
  leaderboardStatistics.classList.add("leaderboard-statistics");
  const leaderboardStatisticsArr = [];

  const statisticIcons = [
    "fa-solid fa-star statistic-icon",
    "fa-solid fa-gauge-high statistic-icon",
    "fa-solid fa-maximize statistic-icon",
    "fa-solid fa-clock statistic-icon",
  ];

  for (let i = 0; i < 4; i++) {
    const leaderboardStatistic = document.createElement("div");
    leaderboardStatistic.classList.add("leaderboard-statistic");
    const statisticIcon = document.createElement("i");
    const statisticIconClasses = [...statisticIcons[i].split(" ")];
    statisticIconClasses.map((className) => {
      statisticIcon.classList.add(className);
    });
    const statisticSpan = document.createElement("span");

    switch (i) {
      case 0:
        statisticSpan.textContent = points;
        break;
      case 1:
        statisticSpan.textContent = speed.toFixed(2);
        break;
      case 2:
        statisticSpan.textContent = boardSize;
        break;
      case 3:
        statisticSpan.textContent = `${hours > 10 ? hours : "0" + hours}:${
          minutes > 10 ? minutes : "0" + minutes
        }:${seconds > 10 ? seconds : "0" + payload.time.seconds}`;
        break;
    }

    statisticSpan.classList.add("statistic-span");

    leaderboardStatistic.appendChild(statisticIcon);
    leaderboardStatistic.appendChild(statisticSpan);

    leaderboardStatisticsArr.push(leaderboardStatistic);
  }

  leaderboardUsername.textContent = username;
  if (message !== "") leaderboardMessageContent.textContent = message;

  leaderboardStatisticsArr.map((stat) =>
    leaderboardStatistics.appendChild(stat)
  );

  leaderboardMessage.appendChild(leaderboardMessageIcon);
  leaderboardMessage.appendChild(leaderboardMessageContent);

  if (message === "") leaderboardMessage.style.display = "none";

  leaderboardProfile.appendChild(leaderboardProfileImg);
  leaderboardProfile.appendChild(leaderboardUsername);

  leaderboardInfo.appendChild(leaderboardProfile);
  leaderboardInfo.appendChild(leaderboardMessage);
  leaderboardInfo.appendChild(leaderboardStatistics);

  recordTrophy.appendChild(trophy);
  recordTrophy.appendChild(playerPos);

  leaderboardRecord.appendChild(recordTrophy);
  leaderboardRecord.appendChild(leaderboardInfo);

  console.log(leaderboardRecord);

  leaderboardProfileImg.src = profile_src;

  if (index > 2) playerPos.textContent = index + 1;

  switch (index) {
    case 0:
      trophy.src = "./assets/1st-place.png";
      break;
    case 1:
      trophy.src = "./assets/2nd-place.png";
      break;
    case 2:
      trophy.src = "./assets/3rd-place.png";
      break;
    default:
      trophy.src = "./assets/star.png";
      break;
  }

  leaderboardRecord.style = `--record-animation-delay: ${index * 0.1}s`;

  return leaderboardRecord;
};

export const handleFetchRecords = ({ from, to }) => {
  // TODO: fetch some records from the API and store them into topPlayers[] array
  // fetching records from the API...

  // map through the records and store them in the leaderboard
  for (const [index, record] of topPlayers.entries()) {
    const recordElem = handleCreateElement(index, record);

    leaderboardTop.appendChild(recordElem);
  }
};

export const calculatePos = () => {
  // TODO: fetch the position of the player from the API using endpoint '/api/user/get-pos'
};

export const sharePos = (e) => {
  // TODO: add position to the DOM and a table, and then do PATCH request to the API (this will be form submit function)
  e.preventDefault();
};
