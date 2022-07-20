// export const query = (data: { [key: string]: any }) => {
// 	const params = Object.keys(data).map(key =>
// 		data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : ''
// 	)
// 	return params.filter(value => !!value).join('&')
// }

export const query = (data: Record<string, any>) => {
	return (
		'?' +
		Object.entries(data)
			.filter(([_, value]) => {
				return value !== undefined && value !== '' && value !== null
			})
			.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
			.join('&')
	)
	// const params = Object.keys(data).map(key =>
	// 	data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : ''
	// )
	// return params.filter(value => !!value).join('&')
}
