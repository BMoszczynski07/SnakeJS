import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleTest(): string {
    return 'Backend application is working properly!';
  }
}
