import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsGateway } from '../events/events.gateway';
@Controller()
export class MqttController {
  constructor(private readonly websocket: EventsGateway) {}
  @MessagePattern('Yootek Internship')
  handleSensorData(@Payload() data: any) {
    console.log(data);
    this.websocket.sendSensorData(data);
  }
}
