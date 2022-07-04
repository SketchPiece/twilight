import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthSocket } from 'src/common/types'

@WebSocketGateway()
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  handleConnection(client: AuthSocket) {
    client.join(client.userId)
    console.log('client connected', client.nickname)
  }
  handleDisconnect(client: AuthSocket) {
    client.leave(client.userId)
    console.log('client disconnected', client.nickname)
  }

  @SubscribeMessage('message')
  handleEvent(
    @MessageBody() data: { to: string; text: string },
    @ConnectedSocket() client: AuthSocket
  ) {
    console.log('Message from', client.nickname, 'to id', data.to, ':', data.text)
    this.server.sockets.to(data.to).emit('message', { from: client.nickname, text: data.text })
  }
}
