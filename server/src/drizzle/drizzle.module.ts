import { Pool } from '@neondatabase/serverless';
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { ConfigService } from 'src/config/config.service';
import * as schema from './schema';

export const DRIZZLE = Symbol("database Connection");
@Module({
  providers: [{
    provide: DRIZZLE,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dbUrl = config.getDatabaseUrl();
      const pool = new Pool({
        connectionString: dbUrl,
      });
      return drizzle(pool,{schema});
    },
  }],
})
export class DrizzleModule {}
