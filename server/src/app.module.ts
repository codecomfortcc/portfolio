import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ProjectsModule, ConfigModule, DatabaseModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
