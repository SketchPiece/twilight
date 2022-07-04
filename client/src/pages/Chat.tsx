import { ChatHeader, ChatInput, Directs } from 'components'
import { useState } from 'react'
import { classNames } from 'utils'

export const Chat = () => {
	const [message, setMessage] = useState('')
	const chatSelected = false
	return (
		<div className="chat-background">
			<div
				className={classNames(chatSelected ? 'md:w-full' : 'w-0', 'md:w-full h-full flex flex-col')}
			>
				<ChatHeader />
				<div className="h-full overflow-y-auto flex flex-col">
					<div></div>
				</div>
				<ChatInput value={message} onChange={e => setMessage(e.target.value)} />
			</div>
			<Directs />
		</div>
	)
}

export default Chat
