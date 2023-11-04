import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { NestExpressApplication } from '@nestjs/platform-express';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  try {
    prisma.$connect();
  } catch (err) {
    throw new Error(`Wykryto błąd! ${err.message}`);
  } finally {
    prisma.$disconnect();
  }

  await app.listen(8000);
}

bootstrap();

export default prisma;
