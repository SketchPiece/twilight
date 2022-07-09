import { useState } from 'react'
import { classNames, UserStatus } from 'utils'
import { ChatHeader, ChatInput, ChatSidebar, ChatWindow } from './components'

export const Chat = () => {
	const [message, setMessage] = useState('')
	const chatSelected = false
	return (
		<div className="chat-background">
			<div
				className={classNames(
					chatSelected ? 'md:w-full' : 'w-0',
					'md:w-full h-full flex flex-col relative'
				)}
			>
				<ChatHeader
					isTyping={true}
					nickname="Liloyei"
					status={UserStatus.ONLINE}
					avatarUrl="https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg"
				/>
				<ChatWindow />
				<ChatInput value={message} onChange={e => setMessage(e.target.value)} />
			</div>
			<ChatSidebar />
		</div>
	)
}

export default Chat
