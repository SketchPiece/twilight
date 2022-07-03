import { ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'

export const ValidationPipeProvider = {
  provide: APP_PIPE,
  useClass: ValidationPipe,
}
