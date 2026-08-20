import { Controller, Req, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import type { RequestWithUser } from '../auth/guards/auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateProfileDto, @Req() req: RequestWithUser) {
    const userId = req.user!.id;
    return this.profilesService.create(dto, userId);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  find(@Req() req: RequestWithUser) {
    const userId = req.user!.id;
    return this.profilesService.findByUserId(userId);
  }
}
