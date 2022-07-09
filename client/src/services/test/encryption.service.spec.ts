import { encryptionService } from '../encryption.service'

describe('EncryptionService', () => {
	const alice = { userId: '123', pass: 'AlicePass' }
	const bob = { userId: '456', pass: 'BobPass' }
	let alicePrivateKey: string
	let bobPrivateKey: string
	const text = 'Hello World'
	let encryptedText: string

	it('should generate seeded privateKey', () => {
		const aliceSeed = `${alice.userId}/${alice.pass}`
		const bobSeed = `${bob.userId}/${bob.pass}`
		alicePrivateKey = encryptionService.getPrivateKey(aliceSeed)

		expect(alicePrivateKey).toBeDefined()
		const alicePrivateKey2 = encryptionService.getPrivateKey(aliceSeed)
		expect(alicePrivateKey).toEqual(alicePrivateKey2)

		bobPrivateKey = encryptionService.getPrivateKey(bobSeed)

		expect(bobPrivateKey).toBeDefined()
		expect(bobPrivateKey).not.toEqual(alicePrivateKey)
	})

	it('should generate publicKey from privateKey', () => {
		const alicePublicKey = encryptionService.getPublicKey(alicePrivateKey)

		expect(alicePublicKey).toBeDefined()
		const alicePublicKey2 = encryptionService.getPublicKey(alicePrivateKey)
		expect(alicePublicKey).toEqual(alicePublicKey2)

		const bobPublicKey = encryptionService.getPublicKey(bobPrivateKey)
		expect(bobPublicKey).toBeDefined()
		expect(bobPublicKey).not.toEqual(alicePublicKey)
	})

	it('should generate shared secret', () => {
		const alicePublicKey = encryptionService.getPublicKey(alicePrivateKey)
		const bobPublicKey = encryptionService.getPublicKey(bobPrivateKey)

		const aliceSharedSecret = encryptionService.getSharedSecret(alicePrivateKey, bobPublicKey)
		expect(aliceSharedSecret).toBeDefined()
		expect(typeof aliceSharedSecret).toBe('string')

		const bobSharedSecret = encryptionService.getSharedSecret(bobPrivateKey, alicePublicKey)
		expect(bobSharedSecret).toBeDefined()
		expect(typeof bobSharedSecret).toBe('string')
		expect(bobSharedSecret).toEqual(aliceSharedSecret)
	})

	it('should encrypt text', () => {
		const bobPublicKey = encryptionService.getPublicKey(bobPrivateKey)
		const sharedSecret = encryptionService.getSharedSecret(alicePrivateKey, bobPublicKey)
		encryptedText = encryptionService.encryptText(text, sharedSecret)
		expect(encryptedText).toBeDefined()
	})

	it('should decrypt text', () => {
		const alicePublicKey = encryptionService.getPublicKey(alicePrivateKey)

		const sharedSecret = encryptionService.getSharedSecret(bobPrivateKey, alicePublicKey)

		const decryptedText = encryptionService.decryptText(encryptedText, sharedSecret)
		expect(decryptedText).toBeDefined()
		expect(decryptedText).toEqual(text)
	})
})
