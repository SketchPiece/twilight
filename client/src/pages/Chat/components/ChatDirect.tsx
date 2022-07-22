import { FC } from 'react'
import { classNames, UserStatus } from 'utils'
import { Avatar } from '../../../components'

interface ChatDirectProps {
	nickname?: string
	selected?: boolean
	unseenNumber?: number
	lastMessage?: string
	avatarUrl?: string
	status?: UserStatus
	onClick?: (nickname: string) => void
}

export const ChatDirect: FC<ChatDirectProps> = ({
	selected = false,
	unseenNumber = 0,
	status,
	lastMessage,
	nickname = 'N/A',
	avatarUrl,
	onClick,
	...rest
}) => {
	const renderUnseenNumber = unseenNumber !== 1 ? (unseenNumber > 99 ? '99+' : unseenNumber) : ''

	return (
		<div
			onClick={() => onClick && onClick(nickname)}
			{...rest}
			className={classNames(
				'rounded-xl py-5 px-6 flex gap-5 items-center justify-between',
				selected ? 'bg-purple-700' : 'bg-space-gray'
			)}
		>
			<div className="flex gap-5 items-center">
				<Avatar status={status} src={avatarUrl} nickname={nickname} />
				<div>
					<div className="text-white font-bold">{nickname}</div>
					<div className="text-light-gray text-xs">{lastMessage}</div>
				</div>
			</div>
			{!!unseenNumber && <div className="notification justify-self-end">{renderUnseenNumber}</div>}
		</div>
	)
}
