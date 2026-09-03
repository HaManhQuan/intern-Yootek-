import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('mqtt')
export class MqttPublishController {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  @Post('publish')
  publishCommand(@Body() data: any) {
    this.client.emit('esp32/command', data);
    return { message: 'Published successfully' };
  }
}
