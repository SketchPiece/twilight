import { createAsyncThunk } from '@reduxjs/toolkit'
import services from 'services'
import { AuthData } from './types'

export const register = createAsyncThunk('register', async ({ nickname, password }: AuthData) =>
	services.auth.register(nickname, password)
)

export const login = createAsyncThunk('login', ({ nickname, password }: AuthData) =>
	services.auth.login(nickname, password)
)

export const logout = createAsyncThunk('logout', () => services.auth.logout())
