import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 15)
  nickname: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  password: string
}
