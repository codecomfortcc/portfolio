import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/createContact.dto';
import { InjectDb } from 'src/drizzle/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/drizzle/schemas/index';
import { ProfanityService } from 'src/profanity/profanity.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectDb() private readonly db: NeonHttpDatabase<typeof schema>,
    private readonly profanityService: ProfanityService,
    private readonly emailService: EmailService,
  ) {}
  async create(createContactDto: CreateContactDto) {
    const message = createContactDto.message;
    const censoredMessage = this.profanityService.exists(message);
    if (censoredMessage) {
      throw new BadRequestException('Profanity detected');
    }
    const result = this.db.insert(schema.contact).values(createContactDto).returning();
    await this.emailService.sendContactEmail(
      createContactDto.name,
      createContactDto.email,
      createContactDto.message,
    );
    return result[0];
  }
}
