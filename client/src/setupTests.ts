/* eslint-disable */
const nodeCrypto = require('crypto')
;(window as any).crypto = {
	getRandomValues: function (buffer: any) {
		return nodeCrypto.randomFillSync(buffer)
	},
}
