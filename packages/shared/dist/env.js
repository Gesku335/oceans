/**
 * Схема окружения (zod). Валидируется при старте сервисов — fail-fast (§CLAUDE.md).
 * Секреты только из env; в dev допустимы заглушки из .env.example,
 * в production прод-секции строже (без дефолтов-заглушек).
 */
import { z } from 'zod';
const port = (fallback) => z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().int().min(1).max(65535))
    .default(String(fallback));
const httpUrl = z.string().url().regex(/^https?:\/\//);
export const baseEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // PostgreSQL
    POSTGRES_USER: z.string().min(1).default('ocean'),
    POSTGRES_PASSWORD: z.string().min(1).default('ocean'),
    POSTGRES_DB: z.string().min(1).default('ocean'),
    POSTGRES_PORT: port(5432),
    DATABASE_URL: z
        .string()
        .url()
        .startsWith('postgresql://')
        .default('postgresql://ocean:ocean@localhost:5432/ocean'),
    // Redis
    REDIS_PORT: port(6379),
    REDIS_URL: z.string().url().startsWith('redis://').default('redis://localhost:6379'),
    // MinIO / S3
    MINIO_ROOT_USER: z.string().min(1).default('minioadmin'),
    MINIO_ROOT_PASSWORD: z.string().min(1).default('minioadmin'),
    MINIO_PORT: port(9000),
    MINIO_CONSOLE_PORT: port(9001),
    S3_ENDPOINT: httpUrl.default('http://localhost:9000'),
    S3_ACCESS_KEY: z.string().min(1).default('minioadmin'),
    S3_SECRET_KEY: z.string().min(1).default('minioadmin'),
    S3_BUCKET: z.string().min(1).default('ocean'),
    // Mail (mailpit в dev)
    MAILPIT_WEB_PORT: port(8025),
    MAILPIT_SMTP_PORT: port(1025),
    SMTP_HOST: z.string().min(1).default('localhost'),
    SMTP_PORT: port(1025),
    // Auth / ЕСИА (в dev значения пустые — за адаптером Mock-реализация)
    ESIA_CLIENT_ID: z.string().default(''),
    ESIA_CLIENT_SECRET: z.string().default(''),
    ESIA_REDIRECT_URI: z.string().url().default('http://localhost:3000/api/auth/esia/callback'),
    JWT_SECRET: z.string().min(8).default('dev-secret-change-in-production'),
    // App
    WEB_URL: httpUrl.default('http://localhost:3000'),
    API_URL: httpUrl.default('http://localhost:4000'),
});
const DEV_PLACEHOLDERS = ['dev-secret-change-in-production', 'ocean', 'minioadmin'];
/** Требования production: никаких дефолтов-заглушек для секретов, ЕСИА должен быть заполнен. */
export function parseEnv(raw) {
    const parsed = baseEnvSchema.parse(raw);
    if (parsed.NODE_ENV === 'production') {
        if (parsed.JWT_SECRET.length < 16 || DEV_PLACEHOLDERS.includes(parsed.JWT_SECRET)) {
            throw new Error('ENV: в production нужен настоящий JWT_SECRET (не заглушка)');
        }
        if (DEV_PLACEHOLDERS.includes(parsed.POSTGRES_PASSWORD)) {
            throw new Error('ENV: в production нельзя пароль БД-заглушку');
        }
        if (DEV_PLACEHOLDERS.includes(parsed.S3_SECRET_KEY)) {
            throw new Error('ENV: в production нельзя S3-ключ-заглушку');
        }
        if (!parsed.ESIA_CLIENT_ID || !parsed.ESIA_CLIENT_SECRET) {
            throw new Error('ENV: в production требуется конфигурация ЕСИА');
        }
    }
    return parsed;
}
//# sourceMappingURL=env.js.map