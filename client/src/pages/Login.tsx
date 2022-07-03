import AuthLayout from 'components/Layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as TwilightLogo } from '../assets/twilight-logo.svg'
import * as yup from 'yup'
import { useCustomForm } from 'hooks'
import { Button, Input } from 'components'

const loginSchema = yup.object({
  nickname: yup.string().required('is required').min(4, 'is too short').max(15, 'is too long'),
  password: yup.string().required('is a required field').min(4, 'is too short'),
})

interface FieldValues {
  nickname: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useCustomForm<FieldValues>({ validationSchema: loginSchema })

  const onLogin = (data: FieldValues) => console.log(data)

  return (
    <AuthLayout onSubmit={handleSubmit(onLogin)}>
      <span className="text-2xl font-bold mx-auto text-white">Welcome to</span>
      <TwilightLogo className="mx-auto" />
      <Input label="Nickname" {...register('nickname')} />
      <Input label="Password" {...register('password')} />
      <Button>Let's go</Button>
      <div className="text-gray text-sm mx-auto">
        Need an account?
        <span className="text-light-blue cursor-pointer" onClick={() => navigate('/register')}>
          {' '}
          Register
        </span>
      </div>
    </AuthLayout>
  )
}

export default Login
