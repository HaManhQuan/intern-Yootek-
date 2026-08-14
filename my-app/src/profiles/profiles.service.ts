import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (profile) {
      throw new ConflictException('Profile already exists for this user');
    }
    return this.prisma.profile.create({
      data: {
        bio: createProfileDto.bio,
        avatar: createProfileDto.avatar,
        userId,
      },
    });
  }

  async findByUserId(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${userId} not found`);
    }
    return profile;
  }
}
