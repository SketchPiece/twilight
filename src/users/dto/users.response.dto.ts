import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from './user.dto'

export class UsersResponseDto {
  @ApiProperty({ type: [UserDto] })
  users: UserDto[]

  @ApiProperty()
  count: number
}
