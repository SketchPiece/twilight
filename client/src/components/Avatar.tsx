import { FC } from 'react'
import { classNames, UserStatus } from 'utils'

interface AvatarProps {
	status?: UserStatus
	nickname?: string
	src?: string
	onClick?: () => void
}

export const Avatar: FC<AvatarProps> = ({ status, onClick, src, nickname = 'N/A', ...rest }) => {
	return src ? (
		<img
			{...rest}
			src={src ? src : undefined}
			onClick={onClick}
			className={classNames(
				'avatar',
				onClick && 'cursor-pointer',
				status && 'avatar-border-' + status
			)}
		/>
	) : (
		<div
			draggable
			className={classNames(
				'avatar avatar-placeholder uppercase flex items-center justify-center text-2xl',
				onClick && 'cursor-pointer',
				status && 'avatar-border-' + status
			)}
		>
			<span className="select-none">{nickname[0]}</span>
		</div>
	)
}
