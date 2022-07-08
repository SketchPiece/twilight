import { Logger } from '@nestjs/common'
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
import { Server } from 'socket.io'
import { AuthSocket } from 'src/common/types'

@WebSocketGateway()
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger(ConnectionGateway.name)

  @WebSocketServer()
  server: Server

  handleConnection(client: AuthSocket) {
    client.join(client.userId)
    this.logger.debug(`Client ${client.nickname} connected. Socket id: ${client.id}`)
  }
  handleDisconnect(client: AuthSocket) {
    client.leave(client.userId)
    this.logger.debug(`Client ${client.nickname} disconnected. Socket id: ${client.id}`)
  }
}
