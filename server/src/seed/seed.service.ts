import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor() {}
  async runSeed() {
    return 'SEED EXECUTED';
  }
}
