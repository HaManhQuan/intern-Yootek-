import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty({ description: 'Tên người dùng', example: 'Nguyen Van A' })
  name: string;

  @ApiProperty({ description: 'Email người dùng', example: 'abcd@gmail.com' })
  email: string;
}
