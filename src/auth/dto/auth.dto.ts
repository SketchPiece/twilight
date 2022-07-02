import { IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  nickname: string

  @IsNotEmpty()
  @IsString()
  password: string
}
