import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGardenDto } from './dto/create-garden.dto';
import { Role } from 'generated/prisma/enums';
import { UpdateGardenDto } from './dto/update-garden.dto';
@Injectable()
export class GardensService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGardenDto: CreateGardenDto, userId: string) {
    return this.prisma.garden.create({
      data: {
        userId,
        name: createGardenDto.name,
      },
    });
  }

  async findAll(
    userId: string,
    role: Role,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const where = role === Role.ADMIN ? {} : { userId };

    const [items, total] = await Promise.all([
      this.prisma.garden.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.garden.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const garden = await this.prisma.garden.findUnique({
      where: { id },
    });
    if (!garden) {
      throw new NotFoundException(`Garden with id ${id} not found`);
    }
    return garden;
  }

  async update(id: string, updateGardenDto: UpdateGardenDto) {
    await this.findOne(id);
    const updatedGarden = await this.prisma.garden.update({
      where: { id },
      data: { ...updateGardenDto },
    });
    return updatedGarden;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.garden.delete({
      where: { id },
    });
  }
}
