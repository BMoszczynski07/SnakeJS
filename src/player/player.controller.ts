import { Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import Player from 'src/shared/Player';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  //   @Get('players')
  //   handleFetchUsers(
  //     @Query('from') from: number,
  //     @Query('to') to: number,
  //   ): Player[] {
  //     return this.playerService.getUsers(from, to);
  //   }

  @Get(':datediff')
  handleSearchUsers(@Query('datediff') dateDiff: number): Promise<Player[]> {
    return this.playerService.searchUsers(dateDiff);
  }
}
