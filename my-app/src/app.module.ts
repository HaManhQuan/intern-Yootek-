import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { logMiddleware } from './common/middleware/log.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { validate } from './config/env.validation';
import { MqttModule } from './mqtt/mqtt.module';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, validate: validate }),
    AuthModule,
    PostsModule,
    ProfilesModule,
    MqttModule,
    EventsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logMiddleware).forRoutes('*');
  }
}
