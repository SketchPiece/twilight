import { query } from 'utils'
import { api, SearchedUsersResponse } from './utils'

export const userService = {
	getUsers: async ({ page, search, limit }: { page: number; search?: string; limit: number }) => {
		const queryString = query({ page, search, limit: limit || 10 })
		return api.get<SearchedUsersResponse>('/users' + queryString).then(res => res.data)
	},
}
