import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  nickname: string

  @ApiProperty({ enum: ['ONLINE', 'OFFLINE', 'BUSY', 'INVISIBLE'] })
  status: string

  @ApiProperty()
  publicKey: string

  @ApiProperty()
  avatarUrl: string
}
