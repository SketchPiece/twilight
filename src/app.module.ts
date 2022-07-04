import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import * as path from 'path'
import { ConfigModule } from '@nestjs/config'
import { ValidationPipeProvider, AccessTokenGuardProvider } from './common/providers'
import { ConnectionModule } from './connection/connection.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    PrismaModule,
    ConnectionModule,
  ],
  providers: [AccessTokenGuardProvider, ValidationPipeProvider],
})
export class AppModule {}
