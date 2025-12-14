import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ProfanityService } from '../profanity/profanity.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [DrizzleModule, EmailModule],
  controllers: [ContactController],
  providers: [ContactService, ProfanityService]
})
export class ContactModule {}
