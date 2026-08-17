import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [JwtStrategy, JwtAuthGuard],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // đảm bảo ConfigModule sẵn sàng
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], // khai báo cần inject ConfigService
    }),
  ],
  exports: [JwtModule, JwtAuthGuard],
})
export class JwtAuthModule {}
