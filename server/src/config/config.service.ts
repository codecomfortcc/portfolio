import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}
 getDatabaseUrl(): string {
    const databaseUrl = this.nestConfigService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set!');
    }
    return databaseUrl;
  }
  getSmtpUser(): string {
    const smtpUser = this.nestConfigService.get<string>('SMTP_USER');
    if (!smtpUser) {
      throw new Error('SMTP_USER environment variable is not set!');
    }
    return smtpUser;
  }
  getSmtpPass(): string {
    const smtpPass = this.nestConfigService.get<string>('SMTP_PASS');
    if (!smtpPass) {
      throw new Error('SMTP_PASS environment variable is not set!');
    }
    return smtpPass;
  }
  getAdminEmail(): string {
    const adminEmail = this.nestConfigService.get<string>('ADMIN_EMAIL');
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set!');
    }
    return adminEmail;
  }
  getJwtSecret(): string {
    const jwtSecret = this.nestConfigService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set!');
    }
    return jwtSecret;
  }
  getReceiveEmail(): string {
    const receiveEmail = this.nestConfigService.get<string>('RECEIVE_EMAIL');
    if (!receiveEmail) {
      throw new Error('RECEIVE_EMAIL environment variable is not set!');
    }
    return receiveEmail;
  }
  getEnv(): string {
    const env = this.nestConfigService.get<string>('NODE_ENV');
    if (!env) {
      throw new Error('NODE_ENV environment variable is not set!');
    }
    return env;
  }
}
