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

export interface SearchedUser {
	avatarUrl: null | string
	id: string
	nickname: string
	publicKey: string | null
}

export interface SearchedUsersResponse {
	count: number
	users: SearchedUser[]
}
