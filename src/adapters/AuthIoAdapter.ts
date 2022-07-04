import { INestApplicationContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server } from 'socket.io'
import { AuthSocket } from 'src/common/types'
import { EnvironmentVariables } from 'src/env'

export class AuthIoAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app)
  }

  createIOServer(port: number, options?: any) {
    const jwtService = this.app.get(JwtService)
    const configService = this.app.get(ConfigService)
    const server: Server = super.createIOServer(port, {
      ...options,
      transports: ['websocket'],
    })

    server.use(createAuthMiddleware(jwtService, configService))

    return server
  }
}

const createAuthMiddleware =
  (jwtService: JwtService, configService: ConfigService<EnvironmentVariables>) =>
  (socket: AuthSocket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers['token']
    if (!token) return next(new Error('FORBIDDEN'))

    try {
      const { sub, nickname } = jwtService.verify(token, {
        secret: configService.get('ACCESS_TOKEN_SECRET'),
      })
      socket.userId = sub
      socket.nickname = nickname
      next()
    } catch {
      next(new Error('FORBIDDEN'))
    }
  }
