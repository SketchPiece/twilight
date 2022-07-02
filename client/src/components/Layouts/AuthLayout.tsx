import { ComponentProps } from 'react'
import { WFC } from 'utils'

interface AuthLayoutProps extends ComponentProps<'form'> {}

const AuthLayout: WFC<AuthLayoutProps> = ({ children, onSubmit }, rest) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit && onSubmit(e)
  }

  return (
    <div className="auth-background grid place-items-center">
      <form
        {...rest}
        onSubmit={submitHandler}
        className="bg-space-gray p-6 rounded-2xl h-full w-full md:w-[426px] md:h-min flex flex-col gap-4 justify-center auth-modal-box-shadow">
        {children}
      </form>
    </div>
  )
}

export default AuthLayout
