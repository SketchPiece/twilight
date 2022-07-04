import { forwardRef, ComponentProps } from 'react'
import { classNames } from 'utils'

interface InputProps extends ComponentProps<'input'> {
	label?: string
	error?: string
	dataCy?: string
	iconPosition?: 'left' | 'right'
	icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, dataCy, icon, iconPosition = 'left', ...rest }, ref) => {
		return (
			<div className="flex flex-col">
				{(label || error) && (
					<div className="mb-2">
						{label && (
							<label
								className={classNames(
									'uppercase font-bold text-xs',
									!!error ? 'text-red' : 'text-white'
								)}
							>
								{label}
							</label>
						)}
						{error && (
							<span data-cy={dataCy + '-error'} className="ml-1.5 text-red/60 text-xs italic">
								{error}
							</span>
						)}
					</div>
				)}
				<div className="relative">
					{icon}
					<input
						data-cy={dataCy + '-input'}
						ref={ref}
						className={classNames(
							'w-full rounded-xl bg-deep-dark p-3 text-white font-bold text-xs focus:outline-0 placeholder:text-oslo-gray placeholder:text-bold',
							icon ? (iconPosition === 'left' ? '  pl-11' : ' pr-11') : ''
						)}
						{...rest}
					/>
				</div>
			</div>
		)
	}
)
