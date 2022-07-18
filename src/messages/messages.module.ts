import { Module } from '@nestjs/common'
import { ConnectionModule } from 'src/connection/connection.module'
import { MessagesGateway } from './messages.gateway'
import { MessagesService } from './services/messages.service'
import { DirectsController } from './directs.controller'
import { DirectsService } from './services/directs.service'

@Module({
  imports: [ConnectionModule],
  providers: [MessagesGateway, MessagesService, DirectsService],
  controllers: [DirectsController],
})
export class MessagesModule {}
