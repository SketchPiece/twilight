import randomBytesSeed from 'utils/randomBytesSeed'
import { getDiffieHellman, createDiffieHellman } from 'diffie-hellman'
import Cryptr from 'cryptr'

const DH_MOD = 'modp14'
const BYTES_SIZE = 256

const getDH = () => {
	const defaultDH = getDiffieHellman(DH_MOD)
	return createDiffieHellman(defaultDH.getPrime('hex'), 'hex', defaultDH.getGenerator())
}

export const encryptionService = {
	getPrivateKey: (seed: string) => {
		const privateKey = randomBytesSeed(BYTES_SIZE, seed)
		return privateKey.toString('hex')
	},
	getPublicKey: (privateKey: string) => {
		const dh = getDH()
		dh.setPrivateKey(privateKey, 'hex')
		dh.generateKeys()
		return dh.getPublicKey('hex')
	},
	getSharedSecret: (privateKey: string, publicKey: string) => {
		const dh = getDH()
		dh.setPrivateKey(privateKey, 'hex')
		dh.generateKeys()
		return dh.computeSecret(publicKey, 'hex').toString('hex')
	},
	encryptText: (text: string, sharedSecret: string) => {
		const cryptr = new Cryptr(sharedSecret)
		return cryptr.encrypt(text)
	},
	decryptText: (text: string, sharedSecret: string) => {
		const cryptr = new Cryptr(sharedSecret)
		return cryptr.decrypt(text)
	},
}
