import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { EmailModule } from '../email/email.module';
import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './jwt.strategy';  

@Module({
  imports: [
    DrizzleModule,
    ConfigModule,
    EmailModule,
    PassportModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.getJwtSecret(),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
