import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Req,
  Query,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GardensService } from './gardens.service';
import { CreateGardenDto } from './dto/create-garden.dto';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { GardenOwnerOrAdminGuard } from './guards/garden-owner-or-admin.guard';
import type { RequestWithUser } from 'src/auth/types/request-with-user';

@Controller('gardens')
export class GardensController {
  constructor(private readonly gardensService: GardensService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createGardenDto: CreateGardenDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user!.id;
    return this.gardensService.create(createGardenDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() req: RequestWithUser,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const userId = req.user!.id;
    const role = req.user!.role;
    const result = await this.gardensService.findAll(
      userId,
      role,
      Number(page) || 1,
      Number(limit) || 10,
    );
    return result;
  }

  @UseGuards(JwtAuthGuard, GardenOwnerOrAdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gardensService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, GardenOwnerOrAdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGardenDto: UpdateGardenDto,
  ) {
    return this.gardensService.update(id, updateGardenDto);
  }

  @UseGuards(JwtAuthGuard, GardenOwnerOrAdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.gardensService.remove(id);
    return { message: `Garden ${id} deleted successefully` };
  }
}
