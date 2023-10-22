import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleHome(): string {
    return 'Backend application for SnakeJS is working properly!';
  }
}
