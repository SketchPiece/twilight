import { WFC } from 'utils'

const AuthLayout: WFC = ({ children }) => {
	return (
		<div className="auth-background grid place-items-center">
			<div className="bg-space-gray p-6 md:rounded-2xl h-full w-full md:w-[426px] md:h-min auth-modal-box-shadow flex items-center">
				{children}
			</div>
		</div>
	)
}

export { AuthLayout }
