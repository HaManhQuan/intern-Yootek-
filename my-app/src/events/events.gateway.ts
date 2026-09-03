import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  sendSensorData(data: any) {
    console.log('Emitting via WebSocket:', data);
    this.server.emit('sensorData', data);
  }
}
