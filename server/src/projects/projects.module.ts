import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
