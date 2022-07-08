import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { AuthState } from './types'
import { login, logout, register } from './actions'
import { AuthResponse } from 'services/utils'
import { getStorageUser } from './utils'

const initialState: AuthState = {
	user: getStorageUser(),
}

const setUser = (state: AuthState, action: PayloadAction<AuthResponse>) => {
	localStorage.setItem('user', JSON.stringify(action.payload.user))
	localStorage.setItem('access_token', action.payload.access_token)
	localStorage.setItem('refresh_token', action.payload.refresh_token)
	state.user = action.payload.user
}

const resetUser = (state: AuthState) => {
	localStorage.removeItem('user')
	localStorage.removeItem('access_token')
	localStorage.removeItem('refresh_token')
	state.user = null
}

export const userSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(login.fulfilled, setUser)
			.addCase(register.fulfilled, setUser)
			.addCase(logout.fulfilled, resetUser),
})

export * from './actions'

export const selectUser = (state: RootState) => state.auth.user

export default userSlice.reducer
