import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    console.log(config.get('DATABASE_URL'));
    const adapter = new PrismaPg({
      connectionString: config.get('DATABASE_URL'),
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
