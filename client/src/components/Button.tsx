import { ComponentProps } from 'react'
import { classNames, WFC } from 'utils'

export const Button: WFC<ComponentProps<'button'>> = ({ children, disabled, ...rest }) => {
  console.log(rest)
  return (
    <button
      disabled={disabled}
      {...rest}
      className={classNames(
        'rounded-xl text-white p-2 font-bold',
        disabled ? 'bg-purple/40' : 'bg-purple hover:bg-purple-hover transition delay-75'
      )}>
      {children}
    </button>
  )
}
