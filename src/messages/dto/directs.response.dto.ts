import { ApiProperty } from '@nestjs/swagger'
import { DirectDto } from './direct.dto'

export class DirectsResponseDto {
  @ApiProperty({ type: [DirectDto] })
  directs: DirectDto[]

  @ApiProperty()
  count: number
}
