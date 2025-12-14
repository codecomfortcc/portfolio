import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.getSmtpUser(),
        pass: this.configService.getSmtpPass(),
      }, 
    });
  }

  async sendContactEmail(name: string, email: string, message: string) {

    try{
         await this.transporter.sendMail({
      from: this.configService.getSmtpUser(),
      to: this.configService.getReceiveEmail(),
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });
  }catch(error){
    console.log(error);
  }
}
async sendOtpEmail(otp:string){
    try{
      await this.transporter.sendMail({
        from: this.configService.getSmtpUser(),
        to: this.configService.getAdminEmail(),
        subject: 'Your Admin Login OTP',
        text: `Your OTP is: ${otp}. It expires in 3 minutes.`,
      });
    }catch(error){
      console.log(error);
    }
  }
}
