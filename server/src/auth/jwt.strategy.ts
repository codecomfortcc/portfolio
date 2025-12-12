import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // 1. Look for the token inside the 'access_token' cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.getJwtSecret(), // Uses your existing config method
    });
  }

  async validate(payload: any) {
    // This attaches { email: ..., role: ... } to req.user
    return { email: payload.email, role: payload.role };
  }
}
