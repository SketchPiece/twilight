import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'

@Injectable()
export class ConnectionService {
  server: Server
}
