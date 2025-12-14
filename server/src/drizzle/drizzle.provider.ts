import { Pool } from '@neondatabase/serverless';
import { Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { ConfigService } from '../config/config.service';
import * as schema from './schemas/index';

export const DRIZZLE_PROVIDER = Symbol('drizzle database connection');
export const InjectDb = () => Inject(DRIZZLE_PROVIDER);

export const DrizzleProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [ConfigService],
 useFactory: async (config: ConfigService) => {
      const dbUrl = config.getDatabaseUrl();
      const pool = new Pool({
        connectionString: dbUrl,
      });
      return drizzle(pool,{schema});
    }
};
