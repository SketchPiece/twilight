import { ApiProperty } from '@nestjs/swagger'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { AsyncApiPub, AsyncApiService, AsyncApiSub } from 'nestjs-asyncapi'
import { Server } from 'socket.io'
import { AuthSocket } from 'src/common/types'

class MessageDto {
  @ApiProperty()
  from: string

  @ApiProperty()
  text: string
}

@AsyncApiService()
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
  @AsyncApiPub({
    channel: 'message',
    summary: 'Send message to some user',
    message: {
      name: 'Test message',
      payload: {
        type: MessageDto,
      },
    },
  })
  handleEvent(
    @MessageBody() data: { to: string; text: string },
    @ConnectedSocket() client: AuthSocket
  ) {
    console.log('Message from', client.nickname, 'to id', data.to, ':', data.text)
    this.emitMessage(data.to, client.nickname, data.text)
  }

  @AsyncApiSub({
    channel: 'message',
    summary: 'Subscribe to messages',
    description: 'Method is used for subscribe to messages',
    message: {
      name: 'test message',
      payload: {
        type: MessageDto,
      },
    },
  })
  emitMessage(to: string, from: string, text: string) {
    this.server.sockets.to(to).emit('message', { from: from, text })
  }
}
