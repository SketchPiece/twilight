import { ApiProperty } from '@nestjs/swagger'
import { DirectDto } from './direct.dto'
import { MessageDto } from './message.dto'

export class SubMessageDto {
  @ApiProperty()
  direct: DirectDto
  @ApiProperty()
  message: MessageDto
}
