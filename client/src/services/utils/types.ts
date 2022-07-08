export interface User {
	userId: string
	nickname: string
	avatarUrl: null | string
}

export interface TokensResponse {
	access_token: string
	refresh_token: string
}

export interface AuthResponse extends TokensResponse {
	user: User
}
