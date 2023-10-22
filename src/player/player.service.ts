import { Injectable } from '@nestjs/common';
import prisma from 'src/main';
import Player from 'src/shared/Player';

@Injectable()
export class PlayerService {
  //  getUsers(from: number, to: number): Player[] {}

  searchUsers = async (dayDiff: number): Promise<Player[]> => {
    const currentDate = new Date().getDate();
    const searchFromDate = new Date().getDate() - dayDiff;

    let searchPlayers: Player[];

    try {
      searchPlayers = await prisma.players.findMany();
    } catch (e) {
      console.error(e);
    }

    return searchPlayers;
  };
}
