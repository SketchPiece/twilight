export const getStorageUser = () => {
	const user = localStorage.getItem('user')
	if (user) {
		return JSON.parse(user)
	}
	return null
}
