type Player = {
  id: number;
  username: string;
  message: string | '';
  imgURL: string;
  points: number;
  speed: number;
  boardSize: number;
  length: number;
  hours: number;
  minutes: number;
  seconds: number;
  published: Date;
};

export default Player;
