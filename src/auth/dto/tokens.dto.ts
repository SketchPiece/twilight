import { ApiProperty } from '@nestjs/swagger'
import { Tokens } from '../types'

export class TokensDto implements Tokens {
  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}
