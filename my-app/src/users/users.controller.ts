import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponseEntity } from './entities/user-response.entity';
import { OwnerOrAdminGuard } from 'src/auth/guards/owner-or-admin.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new UserResponseEntity(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const result = await this.usersService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
    );
    return {
      ...result,
      items: result.items.map((user) => new UserResponseEntity(user)),
    };
  }

  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new UserResponseEntity(user);
  }

  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserResponseEntity(user);
  }

  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: `User ${id} deleted successfully` };
  }
}

// class UserService {

//   private notiService: NotiService;

//   constructor(notiService: NotiService){
//     this.notiService = notiService
//   }

// }

// const userSv = new UserService(notiSv)
