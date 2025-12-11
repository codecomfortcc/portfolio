import { Module,Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


@Global()
@Module({
  imports: [  NestConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      ADMIN_EMAIL: Joi.string().required(),
      DATABASE_URL: Joi.string().required(),
      
    }),
  }),
],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
