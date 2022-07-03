import { forwardRef, ComponentProps } from 'react'
import { classNames } from 'utils'

interface InputProps extends ComponentProps<'input'> {
  'label'?: string
  'error'?: string
  'error-cy'?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      {(label || error) && (
        <div className="mb-2">
          {label && (
            <label
              className={classNames(
                'uppercase font-bold text-xs',
                !!error ? 'text-red' : 'text-white'
              )}>
              {label}
            </label>
          )}
          {error && (
            <span data-cy={rest['error-cy']} className="ml-1.5 text-red/60 text-xs italic">
              {error}
            </span>
          )}
        </div>
      )}
      <input
        {...rest}
        ref={ref}
        className="rounded-xl bg-deep-dark p-3 text-white text-xs focus:outline-0"
      />
    </div>
  )
})
