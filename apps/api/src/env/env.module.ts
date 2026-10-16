import { Global, Module } from '@nestjs/common';
import { env } from './env.js';

export const ENV_TOKEN = Symbol('ENV');

@Global()
@Module({
  providers: [{ provide: ENV_TOKEN, useValue: env }],
  exports: [ENV_TOKEN],
})
export class EnvModule {}