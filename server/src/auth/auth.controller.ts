import { Body, Controller, Post, Res, HttpCode, HttpStatus, Req, UseGuards, Get } from '@nestjs/common'; 
import { AuthService } from './auth.service';
import { type Response } from 'express'; 
import { ConfigService } from '../config/config.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('email') email: string) {
    return this.authService.requestOtp(email);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @Body('otp') otp: string, 
    @Res({ passthrough: true }) res: Response 
  ) {
    const { accessToken } = await this.authService.verifyOtp(otp);

    // 👇 Set the Secure Cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.configService.getEnv() === 'production', 
      sameSite: this.configService.getEnv() === 'production' ? 'none' : 'lax', 
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return { message: 'Login successful' };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user; 
  } 
}
