type KeyType = string | number | symbol

export const query = (data: Record<KeyType, any>) =>
	'?' +
	Object.entries(data)
		.filter(([_, value]) => value !== undefined && value !== null && value !== '')
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join('&')
