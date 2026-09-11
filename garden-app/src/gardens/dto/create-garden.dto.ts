import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateGardenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tên khu vườn', example: 'vườn A' })
  name: string;
}
