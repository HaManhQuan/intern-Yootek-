import { Module } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  providers: [AuthGuard],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // đảm bảo ConfigModule sẵn sàng
      inject: [ConfigService], // khai báo cần inject ConfigService
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  exports: [JwtModule, AuthGuard],
})
export class JwtAuthModule {}
