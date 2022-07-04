import { ComponentProps, FC, useRef } from 'react'
import { classNames } from 'utils'
import { ReactComponent as SendIcon } from '../assets/send.svg'

interface ChatInputProps extends ComponentProps<'textarea'> {}

export const ChatInput: FC<ChatInputProps> = ({ onChange, value }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange && onChange(event)
		textareaRef.current!.style.height = '5px'
		textareaRef.current!.style.height = textareaRef.current!.scrollHeight + 2 + 'px'
	}

	return (
		<div className="p-4 w-full flex relative">
			<textarea
				value={value}
				ref={textareaRef}
				placeholder="Message to someone"
				className="smart-overflow w-full h-[66px] py-5 pr-20 pl-4 max-h-52 bg-deep-dark rounded-xl outline-none text-white resize-none"
				onChange={handleChange}
			/>
			<div className="absolute right-9 top-8 flex gap-5 bg-deep-dark">
				<div className=" h-8 border border-x border-space-gray" />
				<SendIcon
					className={classNames(
						textareaRef.current?.value?.toString().trim().length ? 'send-button' : ''
					)}
				/>
			</div>
		</div>
	)
}
