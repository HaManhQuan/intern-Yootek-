import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthModule } from '../auth/jwt-auth.module';
@Module({
  imports: [PrismaModule, JwtAuthModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
