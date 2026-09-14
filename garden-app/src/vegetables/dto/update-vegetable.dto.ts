import { PickType } from '@nestjs/swagger';
import { CreateVegetableDto } from './create-vegetable.dto';

export class UpdateVegetableDto extends PickType(CreateVegetableDto, [
  'importedQuantity',
  'soldQuantity',
] as const) {}
