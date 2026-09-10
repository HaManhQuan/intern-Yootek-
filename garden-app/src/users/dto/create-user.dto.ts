import { MinLength, IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tên người dùng', example: 'Nguyen Van A' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'Email người dùng', example: 'abcd@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: 'Mật khẩu', example: '' })
  password: string;
}
