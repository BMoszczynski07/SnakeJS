import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Body, Param, Post } from '@nestjs/common/decorators';
import Player from 'src/shared/Player';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('insert')
  handleInsertPlayer(@Body() player: Player) {
    return;
  }

  @Get('players/:from/:to')
  handleFetchUsers(
    @Param('from') from: string,
    @Param('to') to: string,
  ): Promise<Player[]> {
    return this.playerService.getUsers(from, to);
  }

  @Get(':datediff')
  handleSearchUsers(@Param('datediff') dateDiff: number): Promise<Player[]> {
    return this.playerService.searchUsers(dateDiff);
  }
}
