import { Injectable, HttpCode } from '@nestjs/common';
import prisma from 'src/main';
import Player from 'src/shared/Player';

@Injectable()
export class PlayerService {
  getUsers = async (from: string, to: string): Promise<Player[]> => {
    const fetchUsers = await prisma.players.findMany({
      where: {
        id: {
          gte: parseInt(from),
          lte: parseInt(to),
        },
      },
    });

    return fetchUsers;
  };

  searchUsers = async (dateDiff: number): Promise<Player[]> => {
    const curDate = new Date();

    curDate.setDate(curDate.getDate() - dateDiff);

    let searchPlayers: Player[];

    searchPlayers = await prisma.players.findMany({
      where: {
        published: {
          gte: curDate,
        },
      },
    });

    return searchPlayers;
  };
}
