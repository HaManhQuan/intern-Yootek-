import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { logMiddleware } from './common/middleware/log.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { MqttModule } from './mqtt/mqtt.module';
import { EventsModule } from './events/events.module';
import { GardensModule } from './gardens/gardens.module';
import { VegetablesModule } from './vegetables/vegetables.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validate }),
    AuthModule,
    MqttModule,
    EventsModule,
    GardensModule,
    VegetablesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logMiddleware).forRoutes('*');
  }
}
