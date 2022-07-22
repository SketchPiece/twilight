import { Input } from 'components'
import { ChangeEvent, useCallback, useState } from 'react'
import services from 'services'
import { ChatDirect } from '.'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import debounce from 'lodash/debounce'
import { SearchedUser } from 'services/utils'

export const ChatDirects = () => {
	const [search, setSearch] = useState<string>('')
	const [directs, setDirects] = useState<any[]>([])
	const [searchedUsers, setSearchedUsers] = useState<SearchedUser[]>([])
	const [searchedCount, setSearchedCount] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const debouncedGetUsers = useCallback(
		debounce(async (searchText: string) => {
			const res = await services.user.getUsers({ page: 0, limit: 10, search: searchText })
			setSearchedUsers(res.users)
			setSearchedCount(res.count)
			setLoading(false)
		}, 800),
		[]
	)

	const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value
		setSearch(searchText)
		if (!searchText.trim()) {
			debouncedGetUsers.cancel()
			return setLoading(false)
		}
		setLoading(true)
		debouncedGetUsers(searchText.trim())
	}

	return (
		<div className="smart-overflow h-full bg-steel-gray flex flex-col">
			<div className="p-3 relative pt-[52px]">
				<div className="text-oslo-gray font-bold mb-2 fixed top-0 z-10 bg-steel-gray md:w-[446px] p-2">
					Directs
				</div>
				<Input
					value={search}
					onChange={onSearchChange}
					placeholder="Search"
					icon={<SearchIcon className="absolute top-1/2 translate-y-[-50%] left-4" />}
				/>
			</div>
			<div className="flex flex-col gap-3 p-3">
				{loading ? (
					<>loading...</> // loading case for both directs and searched users
				) : search.trim().length ? ( // if search is not empty we sholud display searched users, otherwise display directs
					searchedUsers?.map((user, i) => (
						<ChatDirect
							nickname={user.nickname}
							avatarUrl={user.avatarUrl ? user.avatarUrl : undefined}
							key={i}
						/>
					))
				) : (
					directs.map((direct, i) => (
						<ChatDirect
							nickname={direct.nickname}
							unseenNumber={direct.unseenNumber}
							avatarUrl={direct.avatarUrl ? direct.avatarUrl : undefined}
							status={direct.status}
							lastMessage={direct.lastMessage}
							key={i}
						/>
					))
				)}
			</div>
		</div>
	)
}
