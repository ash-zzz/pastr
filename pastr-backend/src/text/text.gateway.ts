import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TextGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @WebSocketServer() server: Server;

  handleConnection(socket: Socket): void {
    if (socket.handshake.query.path) {
      socket.join(socket.handshake.query.path);
      console.log('🟢', socket.id, 'joined', socket.handshake.query.path);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('⭕', socket.id, 'disconected');
  }

  @SubscribeMessage('subscribe') handleSubscribe(socket: Socket, body: string) {
    if (typeof body !== 'string') {
      return 'Invalid room';
    }
    socket.join(body);
    console.log('🏠', socket.id, 'joined', body);
    return 'Subscribed';
  }

  @SubscribeMessage('dataUpdated')
  handleBody(socket: Socket, body: string): string {
    socket.rooms.forEach((room) => {
      if (room === socket.id) {
        return;
      }
      this.cacheManager.set(room, body);
    });
    socket.to([...socket.rooms]).emit('dataUpdated', body);
    return 'Hello world!';
  }
}
