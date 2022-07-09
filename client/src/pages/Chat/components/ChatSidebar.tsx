import { Input } from 'components'
import { UserStatus } from 'utils'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import { ChatDirect, ChatProfile } from '.'
export const ChatSidebar = () => {
	return (
		<div className="flex flex-col w-full md:min-w-[446px] md:w-[446px]">
			<div className="smart-overflow h-full bg-steel-gray flex flex-col">
				<div className="p-3 relative pt-[52px]">
					<div className="text-oslo-gray font-bold mb-2 fixed top-0 z-10 bg-steel-gray md:w-[446px] p-2">
						Directs
					</div>
					<Input
						placeholder="Search"
						icon={<SearchIcon className="absolute top-1/2 translate-y-[-50%] left-4" />}
					/>
				</div>
				<div className="flex flex-col gap-3 p-3">
					<ChatDirect unseenNumber={1} nickname="Test" status={UserStatus.BUSY} />
					<ChatDirect
						unseenNumber={5}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect
						unseenNumber={0}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect
						unseenNumber={120}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect selected avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg" />
					<ChatDirect
						status={UserStatus.BUSY}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect
						status={UserStatus.ONLINE}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect
						status={UserStatus.IDLE}
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect
						status={UserStatus.INVISIBLE}
						lastMessage="invisible lol"
						avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
					/>
					<ChatDirect avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg" />
					<ChatDirect avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg" />
				</div>
			</div>
			<ChatProfile
				status={UserStatus.ONLINE}
				avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
				nickname="Mr. White"
			/>
		</div>
	)
}
