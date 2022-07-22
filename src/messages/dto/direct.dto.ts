import { ApiProperty } from '@nestjs/swagger'
import { Direct } from '@prisma/client'

export class DirectDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  senderId: string

  @ApiProperty()
  hash: string

  @ApiProperty()
  unseenNumber: number

  @ApiProperty()
  lastMessage: string

  @ApiProperty()
  updated: Date
}
