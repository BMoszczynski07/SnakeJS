export const boardThemesList = {
  light: {
    boardColor: "#dbdbdb",
    tileColor: "#efefef",
    snakeColor: "#444444",
    foodColor: "#c4c415",
    background: "#fff",
    textColor: "#000",
  },
  dark: {
    boardTheme: "#000",
    tileColor: "#202020",
    snakeColor: "#ececec",
    foodColor: "#120f31",
    background: "#262222",
    textColor: "#cecece",
  },
  beige: {
    boardTheme: "#abac77",
    tileColor: "#c7c799",
    snakeColor: "#cec87e",
    foodColor: "#74714e",
    background: "#e6e6c4",
    textColor: "#3e3e2c",
  },
};

let preferences = {
  class: "",
  set: ({ payload, attr }) => {
    if (attr) {
      preferences.class[attr] = payload;
      return;
    }

    preferences.class = payload;
  },
};

export default preferences;
