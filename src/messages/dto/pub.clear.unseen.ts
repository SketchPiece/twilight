import { ApiProperty } from '@nestjs/swagger'

export class PubClearUnseenDto {
  @ApiProperty()
  directHash: string
}
