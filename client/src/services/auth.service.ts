import { api } from './utils'
import { AuthResponse } from './utils/types'

export const authService = {
	login: async (nickname: string, password: string) => {
		return api.post<AuthResponse>('/auth/login', { nickname, password }).then(res => res.data)
	},
	register: async (nickname: string, password: string) => {
		return api
			.post<AuthResponse>('/auth/register', { nickname, password, publicKey: '123' })
			.then(res => res.data)
	},
	logout: async () => {
		return api.post('/auth/logout')
	},
}
