import { UserStatus } from 'utils'
import { ChatDirects, ChatProfile } from '.'

export const ChatSidebar = () => {
	return (
		<div className="flex flex-col w-full md:min-w-[446px] md:w-[446px]">
			<ChatDirects />
			<ChatProfile
				status={UserStatus.ONLINE}
				avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
				nickname="Mr. White"
			/>
		</div>
	)
}
