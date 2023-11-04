import { Body, Injectable, UploadedFile } from '@nestjs/common/decorators';
import { Player } from '@prisma/client';
import { env } from 'process';
import * as sharp from 'sharp';
import prisma from 'src/main';

@Injectable()
export class PlayerService {
  getUsers = async (qty?: string): Promise<Player[]> => {
    let fetchUsers;

    if (qty) {
      fetchUsers = await prisma.player.findMany({
        where: {
          approved: true,
        },
      });
    } else {
      fetchUsers = await prisma.player.findMany({
        take: parseInt(qty),
        where: {
          approved: true,
        },
      });
    }

    return fetchUsers;
  };

  async insertPlayer(
    @Body() player,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<{ http: number; message: string }> {
    try {
      let fileName;

      if (!img) {
        fileName = 'guest.png';
      } else {
        const imageBuffer = await sharp(img.buffer).toFormat('png').toBuffer();

        fileName = `${Date.now()}.png`;
        const filePath = `./uploads/${fileName}`;

        await sharp(imageBuffer).toFile(filePath);
      }

      const date = new Date();

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const newPlayer = {
        username: player.username,
        message: player.message,
        imgURL: `${env.BACKEND_URL}/uploads/${fileName}`,
        points: parseInt(player.points),
        speed: parseInt(player.speed),
        boardSize: parseInt(player.boardSize),
        length: parseInt(player.length),
        hours,
        minutes,
        seconds,
        published: date,
        approved: false,
      };

      const createdPlayer: Player = await prisma.player.create({
        data: newPlayer,
      });
    } catch (e) {
      return { http: 500, message: e.message };
    }

    return { http: 200, message: 'Player added successfully' };
  }

  searchUsers = async (dateDiff: string, qty?: string): Promise<Player[]> => {
    const curDate = new Date();

    curDate.setDate(curDate.getDate() - parseInt(dateDiff));

    let searchPlayers: Player[];

    if (qty) {
      searchPlayers = await prisma.player.findMany({
        take: parseInt(qty),
        where: {
          published: {
            gte: curDate,
          },
          approved: true,
        },
      });
    } else {
      searchPlayers = await prisma.player.findMany({
        where: {
          published: {
            gte: curDate,
          },
          approved: true,
        },
      });
    }

    return searchPlayers;
  };
}
