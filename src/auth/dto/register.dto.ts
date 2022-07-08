import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class RegisterDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  publicKey: string
}
