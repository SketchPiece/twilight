import { authService } from './auth.service'
import { encryptionService } from './encryption.service'
import { userService } from './user.service'

const services = {
	auth: authService,
	encryption: encryptionService,
	user: userService,
}

export default services
