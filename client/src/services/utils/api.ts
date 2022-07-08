import axios from 'axios'
import { TokensResponse } from './types'

const BASE_URL = process.env.REACT_APP_BASE_URL

export const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use(currentConfig => {
	const config = {
		...currentConfig,
		headers: {
			...currentConfig.headers,
			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
		},
	}
	return config
})

api.interceptors.response.use(
	config => config,
	async error => {
		const originalRequestConfig = error.config
		if (error.response.status !== 401 || !error.config || error.config._retry) throw error
		originalRequestConfig._retry = true
		try {
			const response = await axios.post<TokensResponse>(`${BASE_URL}/auth/refresh`)
			localStorage.setItem('access_token', response.data.access_token)
			localStorage.setItem('refresh_token', response.data.refresh_token)
			return api.request(originalRequestConfig)
		} catch (err) {
			throw err
		}
	}
)
