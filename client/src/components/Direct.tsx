import { FC } from 'react'
import { classNames, UserStatus } from 'utils'

interface DirectProps {
	selected?: boolean
	unseenNumber?: number
	lastMessage?: string
	avatarUrl?: string
	status?: UserStatus
}

export const Direct: FC<DirectProps> = ({ selected = false, unseenNumber = 0 }) => {
	const renderUnseenNumber = unseenNumber !== 1 ? (unseenNumber > 99 ? '99+' : unseenNumber) : ''
	return (
		<div
			className={classNames(
				'rounded-xl py-5 px-6 flex gap-5 items-center',
				selected ? 'bg-purple-700' : 'bg-space-gray'
			)}
		>
			<img
				className={classNames('avatar border border-red')}
				src="https://pngroyale.com/wp-content/uploads/2021/12/Download-adorable-cat-PNG.png"
			/>
			<div>
				<div className="text-white font-bold">Liloyei</div>
				<div className="text-light-gray text-xs">Do you like my mushroom hat? It costed...</div>
			</div>
			{!!unseenNumber && <div className="notification">{renderUnseenNumber}</div>}
		</div>
	)
}
