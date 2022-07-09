import { ChatMessage } from '.'

export const ChatWindow = () => {
	return (
		<div className="h-full smart-overflow p-6 pt-[106px]">
			<div className="messages-group">
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					me
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
			<div className="messages-group">
				<ChatMessage
					me
					text={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`}
				/>
				<ChatMessage me text={'It is a long established fact that a reader will be distracted'} />
				<ChatMessage
					me
					text={
						'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
					}
				/>
			</div>

			<div className="messages-group">
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					text={
						'bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
				<ChatMessage
					text={
						'1bladsadasdasd bladsadasdasd fdsfdsfsd  sdfd sf dsf sdf ds fsd fds fsdfdsfsdfds   fdsfsdfdsfsdf   fdsfsdfsdfsd  fdsfdsfsdf   fdsfdsfdsf   fdsfdsfds'
					}
				/>
			</div>
		</div>
	)
}
