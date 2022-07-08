import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { AuthSocket } from 'src/common/types'

@WebSocketGateway()
export class MessagesGateway {
  @SubscribeMessage('message')
  handleMessage(client: AuthSocket, payload: any): string {
    return 'Hello world!'
  }
}
