import { authService } from './auth.service'
import { encryptionService } from './encryption.service'

const services = {
	auth: authService,
	encryption: encryptionService,
}

export default services
