import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsGateway } from '../events/events.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import type { SensorDataPayload } from './types/sensor-data-payload';
@Controller()
export class MqttController {
  constructor(
    private readonly websocket: EventsGateway,
    private readonly prisma: PrismaService,
  ) {}
  @MessagePattern('Yootek Internship')
  async handleSensorData(@Payload() data: SensorDataPayload) {
    console.log(data);
    this.websocket.sendSensorData(data);
    await this.prisma.sensorData.create({
      data: {
        gardenId: data.gardenId,
        temperature: data.temperature,
        moisture: data.moisture,
      },
    });
  }
}
