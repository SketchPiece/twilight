import { ApiProperty } from '@nestjs/swagger'
import { Tokens } from '../types/tokens.type'
import { UserResponse } from '../types/user.response'
import { UserResponseDto } from './user.response.dto'

export class AuthResponseDto implements Tokens {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponse

  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}
