import { ApiProperty } from '@nestjs/swagger'
import { Tokens } from '../types/tokens.type'
import { UserResponse } from '../types/user.response'

export class AuthResponseDto implements UserResponse, Tokens {
  @ApiProperty()
  userId: string

  @ApiProperty()
  nickname: string

  @ApiProperty()
  avatarUrl: string

  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}
