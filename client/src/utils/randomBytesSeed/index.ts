/* eslint-disable @typescript-eslint/no-var-requires */
const isaacCSPRNG = require('./isaacCSPRNG-1.1')

export default function randomBytesSeed(size: number, seed: string): Buffer {
	const prng = isaacCSPRNG(seed)
	return Buffer.from(prng.bytes(size))
}
