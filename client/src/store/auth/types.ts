export interface User {
	userId: string
	nickname: string
	avatarUrl: null | string
}

export interface AuthState {
	user: User | null
}

export interface AuthData {
	nickname: string
	password: string
}
