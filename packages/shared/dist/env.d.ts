/**
 * Схема окружения (zod). Валидируется при старте сервисов — fail-fast (§CLAUDE.md).
 * Секреты только из env; в dev допустимы заглушки из .env.example,
 * в production прод-секции строже (без дефолтов-заглушек).
 */
import { z } from 'zod';
export declare const baseEnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
    POSTGRES_USER: z.ZodDefault<z.ZodString>;
    POSTGRES_PASSWORD: z.ZodDefault<z.ZodString>;
    POSTGRES_DB: z.ZodDefault<z.ZodString>;
    POSTGRES_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    DATABASE_URL: z.ZodDefault<z.ZodString>;
    REDIS_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    REDIS_URL: z.ZodDefault<z.ZodString>;
    MINIO_ROOT_USER: z.ZodDefault<z.ZodString>;
    MINIO_ROOT_PASSWORD: z.ZodDefault<z.ZodString>;
    MINIO_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    MINIO_CONSOLE_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    S3_ENDPOINT: z.ZodDefault<z.ZodString>;
    S3_ACCESS_KEY: z.ZodDefault<z.ZodString>;
    S3_SECRET_KEY: z.ZodDefault<z.ZodString>;
    S3_BUCKET: z.ZodDefault<z.ZodString>;
    MAILPIT_WEB_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    MAILPIT_SMTP_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    SMTP_HOST: z.ZodDefault<z.ZodString>;
    SMTP_PORT: z.ZodDefault<z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>>;
    ESIA_CLIENT_ID: z.ZodDefault<z.ZodString>;
    ESIA_CLIENT_SECRET: z.ZodDefault<z.ZodString>;
    ESIA_REDIRECT_URI: z.ZodDefault<z.ZodString>;
    JWT_SECRET: z.ZodDefault<z.ZodString>;
    WEB_URL: z.ZodDefault<z.ZodString>;
    API_URL: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "test" | "production";
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_PORT: number;
    DATABASE_URL: string;
    REDIS_PORT: number;
    REDIS_URL: string;
    MINIO_ROOT_USER: string;
    MINIO_ROOT_PASSWORD: string;
    MINIO_PORT: number;
    MINIO_CONSOLE_PORT: number;
    S3_ENDPOINT: string;
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
    S3_BUCKET: string;
    MAILPIT_WEB_PORT: number;
    MAILPIT_SMTP_PORT: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    ESIA_CLIENT_ID: string;
    ESIA_CLIENT_SECRET: string;
    ESIA_REDIRECT_URI: string;
    JWT_SECRET: string;
    WEB_URL: string;
    API_URL: string;
}, {
    NODE_ENV?: "development" | "test" | "production" | undefined;
    POSTGRES_USER?: string | undefined;
    POSTGRES_PASSWORD?: string | undefined;
    POSTGRES_DB?: string | undefined;
    POSTGRES_PORT?: string | undefined;
    DATABASE_URL?: string | undefined;
    REDIS_PORT?: string | undefined;
    REDIS_URL?: string | undefined;
    MINIO_ROOT_USER?: string | undefined;
    MINIO_ROOT_PASSWORD?: string | undefined;
    MINIO_PORT?: string | undefined;
    MINIO_CONSOLE_PORT?: string | undefined;
    S3_ENDPOINT?: string | undefined;
    S3_ACCESS_KEY?: string | undefined;
    S3_SECRET_KEY?: string | undefined;
    S3_BUCKET?: string | undefined;
    MAILPIT_WEB_PORT?: string | undefined;
    MAILPIT_SMTP_PORT?: string | undefined;
    SMTP_HOST?: string | undefined;
    SMTP_PORT?: string | undefined;
    ESIA_CLIENT_ID?: string | undefined;
    ESIA_CLIENT_SECRET?: string | undefined;
    ESIA_REDIRECT_URI?: string | undefined;
    JWT_SECRET?: string | undefined;
    WEB_URL?: string | undefined;
    API_URL?: string | undefined;
}>;
export type BaseEnv = z.infer<typeof baseEnvSchema>;
/** Требования production: никаких дефолтов-заглушек для секретов, ЕСИА должен быть заполнен. */
export declare function parseEnv(raw: Record<string, string | undefined>): BaseEnv;
//# sourceMappingURL=env.d.ts.map