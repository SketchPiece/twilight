import { ApiProperty } from '@nestjs/swagger'

export class PubMessageDto {
  @ApiProperty()
  message: string

  @ApiProperty()
  directHash: string
}
