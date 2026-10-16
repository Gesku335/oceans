import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 5;

interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

/**
 * OTP storage and verification. In dev — logs code to console.
 * In prod — would use Redis-backed store and real SMS/email gateway.
 */
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly store = new Map<string, OtpEntry>();

  constructor(private readonly config: ConfigService) {}

  /** Generate and store OTP for a given channel (email or phone). */
  generate(channel: string): string {
    const code = String(randomInt(100000, 999999));
    this.store.set(channel, {
      code,
      expiresAt: Date.now() + OTP_TTL_MS,
      attempts: 0,
    });

    if (this.config.get('NODE_ENV') !== 'production') {
      this.logger.warn(`[DEV OTP] ${channel} → ${code}`);
    }

    return code;
  }

  /** Verify OTP code. Returns true on success, throws on failure. */
  verify(channel: string, code: string): boolean {
    const entry = this.store.get(channel);
    if (!entry) {
      throw new Error('Код не запрашивали или он истёк');
    }

    entry.attempts++;
    if (entry.attempts > OTP_MAX_ATTEMPTS) {
      this.store.delete(channel);
      throw new Error('Превышено количество попыток');
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(channel);
      throw new Error('Код истёк');
    }

    if (entry.code !== code) {
      throw new Error('Неверный код');
    }

    this.store.delete(channel);
    return true;
  }
}