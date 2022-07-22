import { FC } from 'react'
import { classNames } from 'utils'

interface ChatMessageProps {
	me?: boolean
	text?: string
}

export const ChatMessage: FC<ChatMessageProps> = ({ me, text }) => {
	return (
		<div className={classNames('max-w-[90%] md:max-w-[50%] p-4 text-white', me && 'me')}>
			{text}
		</div>
	)
}
