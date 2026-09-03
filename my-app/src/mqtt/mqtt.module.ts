import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { EventsModule } from '../events/events.module';
import { MqttPublishController } from './mqtt.publish.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: { url: 'mqtt://broker.hivemq.com:1883' },
      },
    ]),
    EventsModule,
  ],
  controllers: [MqttController, MqttPublishController],
})
export class MqttModule {}
