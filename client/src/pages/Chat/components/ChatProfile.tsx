import { Avatar } from 'components'
import { FC } from 'react'
import { logout } from 'store/auth'
import { useAppDispatch } from 'store/hooks'
import { UserStatus } from 'utils'
import { ReactComponent as ExitIcon } from '../../../assets/exit.svg'

interface ChatProfileProps {
	nickname?: string
	status?: UserStatus
	avatarUrl?: string
}

export const ChatProfile: FC<ChatProfileProps> = ({ nickname, status, avatarUrl }) => {
	const dispatch = useAppDispatch()

	const onLogout = () => dispatch(logout())
	return (
		<div className="bg-deep-dark py-5 px-6 account-controls flex justify-between items-center relative">
			<div className="flex gap-3 items-center w-full">
				<Avatar status={status} src={avatarUrl} />
				<span className="text-white font-bold">{nickname}</span>
			</div>
			<ExitIcon onClick={onLogout} className="cursor-pointer" />
		</div>
	)
}
