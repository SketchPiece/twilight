import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PublicKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public publicKey: string
}
