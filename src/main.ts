import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import Player from './shared/Player';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/assets', express.static(join(__dirname, '..', 'assets')));

  await app.listen(8000);
}

bootstrap();
