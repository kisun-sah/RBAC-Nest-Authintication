
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
    async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to the database successfully.');
    } catch (error) {
      console.error('❌ Failed to connect to the database:', error);
      throw error;
    }
  }
}
