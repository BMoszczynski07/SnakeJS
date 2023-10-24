import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Param } from '@nestjs/common/decorators';
import Player from 'src/shared/Player';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('players/:from/:to')
  handleFetchUsers(
    @Param('from') from: number,
    @Param('to') to: number,
  ): Promise<Player[]> {
    return this.playerService.getUsers(from, to);
  }

  @Get(':datediff')
  handleSearchUsers(@Param('datediff') dateDiff: number): Promise<Player[]> {
    return this.playerService.searchUsers(dateDiff);
  }
}
