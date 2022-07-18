import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDirectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly recipientId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstMessage: string
}
