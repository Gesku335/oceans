import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { env } from './env/env.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn'] });
  app.enableCors({ origin: env.WEB_URL });
  await app.listen(env.API_PORT);
  console.log(`OCEAN API → http://localhost:${env.API_PORT}`);
}

bootstrap();