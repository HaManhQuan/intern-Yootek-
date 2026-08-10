import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() authRegister: CreateUserDto) {
    return this.authService.register(authRegister);
  }

  @Post('login')
  login(@Body() authLogin: LoginDto) {
    return this.authService.login(authLogin);
  }
}
