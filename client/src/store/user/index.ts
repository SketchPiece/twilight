import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthResponse, IUser } from 'utils/models/AuthResponse'
import { BASE_URL } from 'utils/http'
import AuthService from 'utils/services/AuthService'
import axios from 'axios'
import { RootState } from 'store'

interface UserState {
	user: IUser
	isAuth: boolean
	isLoading: boolean
}

const initialState: UserState = {
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
}

export interface AuthData {
	nickname: string
	password: string
}

export const login = createAsyncThunk(
	BASE_URL + '/auth/login',
	async ({ nickname, password }: AuthData) => {
		const response = await AuthService.login(nickname, password)
		return response.data
	}
)

export const registration = createAsyncThunk(
	BASE_URL + '/auth/register',
	async ({ nickname, password }: AuthData) => {
		const response = await AuthService.register(nickname, password)
		return response.data
	}
)

export const logout = createAsyncThunk(BASE_URL + '/auth/logout', async () => {
	const response = await AuthService.logout()
	return response
})

export const checkAuth = createAsyncThunk(
	BASE_URL + '/auth/refresh',

	async () => {
		const response = await axios.post<AuthResponse>(BASE_URL + '/auth/refresh', undefined, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
			},
		})
		return response.data
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[login.fulfilled.type]: (state, action) => {
			localStorage.setItem('token', action.payload.access_token)
			localStorage.setItem('refresh_token', action.payload.refresh_token)
			state.isAuth = true
			state.user = action.payload.user
		},
		[registration.fulfilled.type]: (state, action) => {
			localStorage.setItem('token', action.payload.access_token)
			localStorage.setItem('refresh_token', action.payload.refresh_token)
			state.isAuth = true
			state.user = action.payload.user
		},
		[logout.fulfilled.type]: state => {
			localStorage.removeItem('token')
			localStorage.removeItem('refresh_token')
			state.isAuth = false
			state.user = {} as IUser
		},
		[checkAuth.fulfilled.type]: (state, action) => {
			localStorage.setItem('token', action.payload.access_token)
			localStorage.setItem('refresh_token', action.payload.refresh_token)
			state.isAuth = true
			state.isLoading = false
		},
		[checkAuth.pending.type]: state => {
			state.isLoading = true
		},
		[checkAuth.rejected.type]: state => {
			state.isLoading = false
		},
	},
})

export const authSelector = (state: RootState) => state.user.isAuth

export default userSlice.reducer
