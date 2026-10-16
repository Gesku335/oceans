import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseEnv } from './env.js';

const dotenvSample = readFileSync(
  fileURLToPath(new URL('../../../.env.example', import.meta.url)),
  'utf8',
);

function parseDotenv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m) out[m[1]] = m[2];
  }
  return out;
}

describe('parseEnv', () => {
  it('валидирует .env.example без ошибок', () => {
    const env = parseEnv(parseDotenv(dotenvSample));
    expect(env.NODE_ENV).toBe('development');
    expect(env.DATABASE_URL).toContain('postgresql://');
    expect(env.REDIS_URL).toContain('redis://');
    expect(env.POSTGRES_PORT).toBe(5432);
    expect(env.SMTP_PORT).toBe(1025);
    expect(env.S3_ENDPOINT).toBe('http://localhost:9000');
    expect(env.WEB_URL).toBe('http://localhost:3000');
    expect(env.API_URL).toBe('http://localhost:4000');
  });

  it('пустой объект получает dev-дефолты', () => {
    const env = parseEnv({});
    expect(env.NODE_ENV).toBe('development');
    expect(env.JWT_SECRET).toBe('dev-secret-change-in-production');
  });

  it('бросает на невалидном URL', () => {
    expect(() => parseEnv({ DATABASE_URL: 'not-a-url' })).toThrow();
  });

  it('бросает на нечисловом порту', () => {
    expect(() => parseEnv({ REDIS_PORT: 'abc' })).toThrow();
    expect(() => parseEnv({ REDIS_PORT: '70000' })).toThrow();
  });

  it('production: заглушки секретов запрещены', () => {
    expect(() =>
      parseEnv({
        NODE_ENV: 'production',
        JWT_SECRET: 'dev-secret-change-in-production',
        POSTGRES_PASSWORD: 'strong-pg-pass',
        S3_SECRET_KEY: 'real-s3-secret',
        ESIA_CLIENT_ID: 'cid',
        ESIA_CLIENT_SECRET: 'csec',
      }),
    ).toThrow(/JWT_SECRET/);

    expect(() =>
      parseEnv({
        NODE_ENV: 'production',
        JWT_SECRET: 'a-very-real-secret-value',
        POSTGRES_PASSWORD: 'ocean',
        ESIA_CLIENT_ID: 'cid',
        ESIA_CLIENT_SECRET: 'csec',
      }),
    ).toThrow(/пароль БД/);

    expect(() =>
      parseEnv({
        NODE_ENV: 'production',
        JWT_SECRET: 'a-very-real-secret-value',
        POSTGRES_PASSWORD: 'strong-pg-pass',
        S3_SECRET_KEY: 'real-s3-secret',
        ESIA_CLIENT_ID: '',
        ESIA_CLIENT_SECRET: '',
      }),
    ).toThrow(/ЕСИА/);
  });

  it('production: корректный env проходит', () => {
    const env = parseEnv({
      NODE_ENV: 'production',
      JWT_SECRET: 'a-very-real-secret-value',
      POSTGRES_PASSWORD: 'strong-pg-pass',
      S3_SECRET_KEY: 'real-s3-secret',
      ESIA_CLIENT_ID: 'cid',
      ESIA_CLIENT_SECRET: 'csec',
    });
    expect(env.NODE_ENV).toBe('production');
  });
});
