import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import * as path from 'path'
import { AtGuardProvider } from './common/guards'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  providers: [AtGuardProvider],
})
export class AppModule {}
