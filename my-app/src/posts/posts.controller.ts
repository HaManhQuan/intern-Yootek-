import {
  Controller,
  Req,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import type { RequestWithUser } from '../auth/guard/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PostsService } from './posts.service';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreatePostDto, @Req() req: RequestWithUser) {
    const userId = req.user!.id;
    return this.postsService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }
}
