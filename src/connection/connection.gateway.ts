import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthSocket } from 'src/common/types'
import { ConnectionService } from './connection.service'

@WebSocketGateway()
export class ConnectionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger(ConnectionGateway.name)

  constructor(private readonly connectionService: ConnectionService) {}

  afterInit(server: Server) {
    this.connectionService.server = server
    this.logger.debug('ConnectionGateway initialized')
  }

  handleConnection(client: AuthSocket) {
    client.join(client.userId)
    this.logger.debug(`Client ${client.nickname} connected. Socket id: ${client.id}`)
  }
  handleDisconnect(client: AuthSocket) {
    client.leave(client.userId)
    this.logger.debug(`Client ${client.nickname} disconnected. Socket id: ${client.id}`)
  }
}
