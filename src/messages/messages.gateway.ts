import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { AsyncApiPub, AsyncApiService, AsyncApiSub } from 'nestjs-asyncapi'
import { AuthSocket } from 'src/common/types'
import { PubClearUnseenDto } from './dto/pub.clear.unseen'
import { PubMessageDto } from './dto/pub.message.dto'
import { SubMessageDto } from './dto/sub.message.dto'
import { MessagesService } from './services/messages.service'

@AsyncApiService()
@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @AsyncApiSub({
    channel: 'messages',
    summary: 'Subscribe to messages and direct updates',
    message: {
      name: 'Received Message',
      payload: {
        type: SubMessageDto,
      },
    },
  })
  @AsyncApiPub({
    channel: 'message',
    summary: 'Send message to user using direct hash',
    message: {
      name: 'Send Message',
      payload: {
        type: PubMessageDto,
      },
    },
  })
  @SubscribeMessage('message')
  async handleMessage(client: AuthSocket, payload: PubMessageDto) {
    try {
      await this.messagesService.createMessage(client.userId, payload)
      return this.response()
    } catch (error) {
      return this.response('error', error.message)
    }
  }

  @AsyncApiPub({
    channel: 'clearUnseen',
    summary: 'Clears unseen number for direct',
    message: {
      name: 'Clear Unseen',
      payload: {
        type: PubClearUnseenDto,
      },
    },
  })
  @SubscribeMessage('clearUnseen')
  async clearUnseenNumber(client: AuthSocket, { directHash }: PubClearUnseenDto) {
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
