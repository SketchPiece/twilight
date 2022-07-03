import { ComponentProps } from 'react'
import { classNames, WFC } from 'utils'

interface ButtonProps extends ComponentProps<'button'> {
  dataCy?: string
}

export const Button: WFC<ButtonProps> = ({ children, disabled, dataCy, ...rest }) => {
  return (
    <button
      disabled={disabled}
      data-cy={dataCy}
      {...rest}
      className={classNames(
        'rounded-xl text-white p-2 font-bold',
        disabled
          ? 'bg-purple/40'
          : 'bg-purple hover:bg-purple-hover transition delay-75 focus:outline-0'
      )}>
      {children}
    </button>
  )
}
