/* eslint-disable @typescript-eslint/no-var-requires */
let isaacCSPRNG = require('./isaacCSPRNG-1.1')
isaacCSPRNG = isaacCSPRNG.default || isaacCSPRNG

export default function randomBytesSeed(size: number, seed: string): Buffer {
	const prng = isaacCSPRNG(seed)
	return Buffer.from(prng.bytes(size))
}
