import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from '../guards'

export const AccessTokenGuardProvider = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
}
