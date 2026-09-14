import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
export class CreateVegetableDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên loại rau',
    example: 'rau muống',
  })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Số tiền', example: 1000 })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Số lượng nhập', example: 1 })
  importedQuantity: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'Số lượng bán', example: 1 })
  soldQuantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID khu vườn',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  gardenId: string;
}
