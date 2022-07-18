import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { AuthSocket } from 'src/common/types'
import { PubMessageDto } from './dto/pub.message.dto'
import { MessagesService } from './services/messages.service'

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('message')
  async handleMessage(client: AuthSocket, payload: PubMessageDto) {
    try {
      await this.messagesService.createMessage(client.userId, payload)
      return this.response()
    } catch (error) {
      return this.response('error', error.message)
    }
  }

  @SubscribeMessage('clearUnseen')
  async clearUnseenNumber(client: AuthSocket, directHash: string) {
    try {
      await this.messagesService.clearUnseenNumber(client.userId, directHash)
      return this.response()
    } catch (error) {
      return this.response('error', error.message)
    }
  }

  response(status: 'success' | 'error' = 'success', error?: string) {
    if (status === 'error') return { status, message: error }
    return { status }
  }
}
