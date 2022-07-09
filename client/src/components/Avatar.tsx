import { ComponentProps, FC } from 'react'
import { classNames, UserStatus } from 'utils'

interface AvatarProps extends ComponentProps<'img'> {
	status?: UserStatus
	nickname?: string
}

export const Avatar: FC<AvatarProps> = ({ status, onClick, src, nickname = 'N/A', ...rest }) => {
	return src ? (
		<img
			{...rest}
			src={src}
			onClick={onClick}
			className={classNames(
				'avatar',
				onClick && 'cursor-pointer',
				status && 'avatar-border-' + status
			)}
		/>
	) : (
		<div
			className={classNames(
				'avatar avatar-placeholder uppercase flex items-center justify-center text-2xl',
				onClick && 'cursor-pointer',
				status && 'avatar-border-' + status
			)}
		>
			{nickname[0]}
		</div>
	)
}
