import { Avatar } from 'components'
import { FC } from 'react'
import { UserStatus } from 'utils'

interface ChatHeaderProps {
	nickname?: string
	isTyping?: boolean
	status?: UserStatus
	avatarUrl?: string
}

export const ChatHeader: FC<ChatHeaderProps> = ({
	nickname = 'N/A',
	isTyping,
	status = UserStatus.INVISIBLE,
	avatarUrl,
}) => {
	return (
		<div className=" bg-space-gray/60 py-4 px-5 flex absolute w-full backdrop-blur-xl">
			<Avatar src={avatarUrl} />
			<div className="pl-2">
				<div>
					<span className="text-white font-bold">{nickname}</span>{' '}
					{isTyping && <span className="text-oslo-gray">is typing...</span>}
				</div>
				<div className="text-light-gray">{status}</div>
			</div>
		</div>
	)
}
