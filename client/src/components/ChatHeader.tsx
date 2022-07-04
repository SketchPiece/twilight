import { FC } from 'react'

interface ChatHeaderProps {}

export const ChatHeader: FC<ChatHeaderProps> = () => {
	return (
		<div className=" bg-space-gray/60 py-4 px-5 flex">
			<img
				className=" pr-2 avatar"
				src="https://pngroyale.com/wp-content/uploads/2021/12/Download-adorable-cat-PNG.png"
			/>
			<div>
				<div>
					<span className="text-white font-bold">Liloyei</span>{' '}
					<span className="text-oslo-gray">is typing...</span>
				</div>
				<div className="text-light-gray">Busy</div>
			</div>
		</div>
	)
}
