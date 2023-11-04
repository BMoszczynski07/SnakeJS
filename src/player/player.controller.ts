import {
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import {
  Body,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Player } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('insert')
  @UseInterceptors(FileInterceptor('img'))
  handleInsertPlayer(
    @Body() player,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 200 })],
      }),
    )
    img: Express.Multer.File,
  ): Promise<{ http: number; message: string }> {
    return this.playerService.insertPlayer(player, img);
  }

  @Get('fetch')
  handleFetchUsers(@Query('from') qty: string): Promise<Player[]> {
    return this.playerService.getUsers(qty || undefined);
  }

  @Get('search/:datediff')
  handleSearchUsers(
    @Param('datediff') dateDiff: string,
    @Query('qty') qty: string,
  ): Promise<Player[]> {
    if (qty) {
      return this.playerService.searchUsers(dateDiff, qty);
    }

    return this.playerService.searchUsers(dateDiff);
  }
}
