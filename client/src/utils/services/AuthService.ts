import { AxiosResponse } from 'axios'
import api from 'utils/http'
import { AuthResponse } from 'utils/models/AuthResponse'

export default class AuthService {
	static async login(nickname: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('/auth/login', { nickname, password })
	}
	static async register(nickname: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('/auth/register', { nickname, password })
	}
	static async logout(): Promise<void> {
		return api.post('/auth/logout')
	}
}
