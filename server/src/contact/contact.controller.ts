import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/createContact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }
}
