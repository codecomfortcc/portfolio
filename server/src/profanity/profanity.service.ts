import { Injectable } from '@nestjs/common';
import { Profanity, ProfanityOptions } from '@2toad/profanity';

@Injectable()
export class ProfanityService {
  private profanity: Profanity;

  constructor() {
    const options: ProfanityOptions = {
        wholeWord: false,
        grawlix: '****',
        grawlixChar: '*',
        languages: ['en'],
        unicodeWordBoundaries: true,
    };

    this.profanity = new Profanity(options);
  }

  censor(text: string): string {
    return this.profanity.censor(text);
  }

  exists(text: string): boolean {
    return this.profanity.exists(text);
  }
}
