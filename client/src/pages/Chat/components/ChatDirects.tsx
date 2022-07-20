import { Input } from 'components'
import { useCallback, useState } from 'react'
import services from 'services'
import { ChatDirect } from '.'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import debounce from 'lodash/debounce'

interface SearchUser {
	avatarUrl: null | string
	id: string
	nickname: string
	publicKey: string
}

export const ChatDirects = () => {
	const [search, setSearch] = useState<string>('')
	const [directs, setDirects] = useState<any[]>([])
	const [searchedUsers, setSearchedUsers] = useState<SearchUser[]>([])
	const [searchedCount, setSearchedCount] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const debouncedGetUsers = useCallback(
		debounce(async searchText => {
			const res = await services.user.getUsers({ page: 0, limit: 10, search: searchText })
			setSearchedUsers(res.users)
			setSearchedCount(res.count)
			setLoading(false)
		}, 800),
		[]
	)

	const onSearchChange = async (e: any) => {
		setLoading(true)
		setSearch(e.target.value)
		debouncedGetUsers(search)
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
				) : search.length ? ( // if search is not empty we sholud display searched users, otherwise display directs
					searchedUsers?.map((user, i) => <ChatDirect nickname={user.nickname} key={i} />)
				) : (
					directs.map((direct, i) => (
						<ChatDirect
							nickname={direct.nickname}
							unseenNumber={direct.unseenNumber}
							avatarUrl={direct.avatarUrl}
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
