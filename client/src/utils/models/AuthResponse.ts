export interface IUser {
	userId: string
	nickname: string
	avatarUrl: null | string
}

export interface AuthResponse {
	user: IUser
	access_token: string
	refresh_token: string
}

export interface RefreshResponse {
	access_token: string
	refresh_token: string
}
