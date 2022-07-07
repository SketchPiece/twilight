import { ApiProperty } from '@nestjs/swagger'
import { UserResponse } from '../types'

export class UserResponseDto implements UserResponse {
  @ApiProperty()
  userId: string

  @ApiProperty()
  nickname: string

  @ApiProperty()
  avatarUrl: string | null
}
