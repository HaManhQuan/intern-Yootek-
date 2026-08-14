import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.posts.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.posts.findMany();
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }
}
