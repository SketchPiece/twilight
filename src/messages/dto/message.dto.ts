import { ApiProperty } from '@nestjs/swagger'

export class MessageDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  senderId: string

  @ApiProperty()
  text: string

  @ApiProperty()
  directHash: Date

  @ApiProperty()
  created: Date
}
