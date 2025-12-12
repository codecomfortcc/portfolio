import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from './config/config.module';

import { DrizzleModule } from './drizzle/drizzle.module';
import { ContactModule } from './contact/contact.module';
import { ProfanityService } from './profanity/profanity.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, ConfigModule, DrizzleModule, ContactModule, EmailModule, AuthModule],
  controllers: [],
  providers: [ProfanityService],
})
export class AppModule {}
