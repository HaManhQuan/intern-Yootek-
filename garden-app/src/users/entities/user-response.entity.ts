import { Exclude, Expose } from 'class-transformer';
@Exclude() // mặc định ẩn TẤT CẢ field
export class UserResponseEntity {
  @Expose() //Expose: cho phép field nào được hiện
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  constructor(partial: Partial<UserResponseEntity>) {
    Object.assign(this, partial);
  }
}
