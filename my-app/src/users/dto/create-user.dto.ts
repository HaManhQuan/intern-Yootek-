export class CreateUserDto {
  name: string;

@IsEmail()
  email: string;
}
