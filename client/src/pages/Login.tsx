import AuthLayout from 'components/Layouts/AuthLayout'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as TwilightLogo } from '../assets/twilight-logo.svg'
import * as yup from 'yup'
import { useErrorForm } from 'hooks'
import { Button, Input } from 'components'

const loginSchema = yup.object({
  nickname: yup
    .string()
    .required('is a required field')
    .min(4, 'is too short')
    .matches(/^[^0-9]\w+$/, `can't start with a number contains only a-Z, 0-9`)
    .max(15, 'is too long'),

  password: yup.string().required('is a required field').min(4, 'is too short'),
})

interface Inputs {
  nickname: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useErrorForm<Inputs>(loginSchema)

  const onSubmit: SubmitHandler<Inputs> = data =>
    console.log('validation is passed, data is: ', data)

  const goToRegister = () => navigate('/register')

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)}>
      <span className="text-2xl font-bold m-auto text-white">Welcome to</span>
      <TwilightLogo className="m-auto" />
      <Input label="Nickname" {...register('nickname')} />
      <Input label="Password" {...register('password')} />
      <Button>Let's go</Button>
      <div className="text-gray text-sm m-auto">
        Need an account?
        <span className="text-light-blue cursor-pointer" onClick={goToRegister}>
          {' '}
          Register
        </span>
      </div>
    </AuthLayout>
  )
}

export default Login
