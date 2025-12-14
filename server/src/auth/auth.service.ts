import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectDb } from '../drizzle/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '../drizzle/schemas/index';
import { eq } from 'drizzle-orm';
import { ConfigService } from '../config/config.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    @InjectDb() private readonly db: NeonHttpDatabase<typeof schema>,
    private config: ConfigService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}
async requestOtp(email: string) {
    const myEmail = this.config.getAdminEmail();
    if (email !== myEmail) {
      throw new UnauthorizedException('Unauthorized');
    }
    
    let [admin] = await this.db
      .select()
      .from(schema.adminAuth)
      .where(eq(schema.adminAuth.email, myEmail));

    if (!admin) {
      await this.db.insert(schema.adminAuth).values({ email: myEmail });
      [admin] = await this.db.select().from(schema.adminAuth).where(eq(schema.adminAuth.email, myEmail));
    }

    // 🛑 1. BLOCK IF LOCKED
    // If they failed 5 times, don't let them send more emails!
    if (admin.lockedUntil && new Date() < admin.lockedUntil) {
       throw new UnauthorizedException('Account is locked. Try again later.');
    }


    if (admin.otpExpiresAt && admin.otpExpiresAt.getTime() > Date.now() + 2 * 60 * 1000) {
       throw new UnauthorizedException('Please wait a minute before requesting another OTP.');
    }

    if (admin.otpExpiresAt && admin.otpExpiresAt.getTime() > Date.now() + 2 * 60 * 1000) {
       throw new UnauthorizedException('Please wait a minute before requesting another OTP.');
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    await this.db
      .update(schema.adminAuth)
      .set({ otp, otpExpiresAt: expiresAt }) 
      .where(eq(schema.adminAuth.email, myEmail));

    try {
      await this.emailService.sendOtpEmail(otp);
      return { message: 'OTP sent to your email' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
  async verifyOtp(inputOtp: string) {
    const myEmail = this.config.getAdminEmail();
    const [admin] = await this.db
      .select()
      .from(schema.adminAuth)
      .where(eq(schema.adminAuth.email, myEmail));

    if (!admin) throw new UnauthorizedException('Admin not initialized');

    if (admin.lockedUntil && new Date() < admin.lockedUntil) {
      throw new UnauthorizedException('Account is locked. Try again later.');
    }

    if (!admin.otpExpiresAt) {
      throw new UnauthorizedException('No OTP requested');
    }

    // 2. CHECK: Logic
    if (admin.otp !== inputOtp || new Date() > admin.otpExpiresAt) {
      const newAttempts = (admin.failedAttempts ?? 0) + 1;

      if (newAttempts >= 5) {
        // Lock for 30 minutes
        const lockTime = new Date(Date.now() + 30 * 60 * 1000);
        await this.db
          .update(schema.adminAuth)
          .set({
            failedAttempts: 0,
            lockedUntil: lockTime,
          })
          .where(eq(schema.adminAuth.email, myEmail));

        throw new UnauthorizedException(
          'Too many failed attempts. Account locked for 30 minutes.',
        );
      } else {
        // Increment counter
        await this.db
          .update(schema.adminAuth)
          .set({
            failedAttempts: newAttempts,
          })
          .where(eq(schema.adminAuth.email, myEmail));

        throw new UnauthorizedException(
          `Invalid or Expired OTP. ${5 - newAttempts} attempts remaining.`,
        );
      }
    }


    await this.db
      .update(schema.adminAuth)
      .set({
        otp: null,
        otpExpiresAt: null,
        failedAttempts: 0,
        lockedUntil: null,
      })
      .where(eq(schema.adminAuth.email, myEmail));

    const payload = { email: myEmail, role: 'admin' };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
