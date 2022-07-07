import axios from 'axios'
import { RefreshResponse } from 'utils/models/AuthResponse'

export const BASE_URL = '/api'

const api = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
})

api.interceptors.request.use(config => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.post<RefreshResponse>(`${BASE_URL}/auth/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem('token', response.data.access_token)
				localStorage.setItem('refresh_token', response.data.refresh_token)
				return api.request(originalRequest)
			} catch (e) {
				console.log('НЕ АВТОРИЗОВАН')
			}
		}
		throw error
	}
)

export default api
