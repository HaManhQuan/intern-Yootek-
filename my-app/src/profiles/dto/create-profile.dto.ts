import { IsString, IsNotEmpty } from 'class-validator';
export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
