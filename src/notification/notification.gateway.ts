import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(userId: string, payload: any) {
    this.server.to(userId).emit('new-notification', payload);
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, userId: string) {
    console.log(`Client ${client.id} joined room ${userId}`);
    await client.join(userId);
    client.emit('joined', `Joined room: ${userId}`);
  }
}
