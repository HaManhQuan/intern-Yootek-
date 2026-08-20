import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.posts.delete({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    const updatePost = await this.prisma.posts.update({
      where: { id },
      data: { ...updatePostDto },
    });
    return updatePost;
  }
}
