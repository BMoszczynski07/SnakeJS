export const bombs = [];

export let bombsState = {
  state: true,
  toggle: () => {
    bombsState.state = !bombsState.state;
  },
};

export let bombsInterval = {
  val: "",
  set: ({ payload }) => {
    bombsInterval.val = payload;
  },
};
