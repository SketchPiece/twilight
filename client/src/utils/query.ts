type EncodeURIComponentType = string | number | boolean

type ValueType = EncodeURIComponentType | null | undefined

// !todo: better types for query

export const query = (data: Record<string, any>) =>
	'?' +
	Object.entries(data)
		.filter(([_, value]) => value !== undefined && value !== null && value !== '')
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join('&')
