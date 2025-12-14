import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '../config/config.service';

@Module({
  providers: [EmailService, ConfigService],
  exports: [EmailService]
})
export class EmailModule {}
