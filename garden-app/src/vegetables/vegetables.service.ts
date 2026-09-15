import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { CreateVegetableDto } from './dto/create-vegetable.dto';

@Injectable()
export class VegetablesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVegetableDto: CreateVegetableDto) {
    return this.prisma.vegetable.create({
      data: {
        gardenId: createVegetableDto.gardenId,
        name: createVegetableDto.name,
        price: createVegetableDto.price,
        importedQuantity: createVegetableDto.importedQuantity,
        soldQuantity: createVegetableDto.soldQuantity ?? 0,
      },
    });
  }
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.vegetable.findMany({
        skip,
        take: limit,
      }),
      this.prisma.vegetable.count({}),
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
    const vegetable = await this.prisma.vegetable.findUnique({
      where: { id },
    });
    if (!vegetable) {
      throw new NotFoundException(`Vegetable with id ${id} not found`);
    }
    return vegetable;
  }

  async update(id: string, updateVegetableDto: UpdateVegetableDto) {
    await this.findOne(id);
    const updatedVegetable = await this.prisma.vegetable.update({
      where: { id },
      data: { ...updateVegetableDto },
    });
    return updatedVegetable;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.vegetable.delete({
      where: { id },
    });
  }
}
