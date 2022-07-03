import AuthLayout from 'components/Layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useCustomForm } from 'hooks'
import { Button, Input } from 'components'

const registerSchema = yup.object({
  nickname: yup
    .string()
    .required('is a required field')
    .min(4, 'is too short')
    .matches(/^[^0-9]\w+$/, `can't start with a number contains only a-Z, 0-9`)
    .max(15, 'is too long'),

  password: yup.string().required('is a required field').min(4, 'is too short'),
  passwordConfirm: yup
    .string()
    .required('is a required field')
    .oneOf([yup.ref('password'), null], 'should be the same as password'),
})

interface FieldValues {
  nickname: string
  password: string
  passwordConfirm: string
}

export const Register = () => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useCustomForm<FieldValues>({
    validationSchema: registerSchema,
  })

  const onSubmit = (data: FieldValues) => console.log(data)

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)}>
      <span className="text-2xl font-bold mx-auto text-white">Register</span>
      <Input label="Nickname" {...register('nickname')} />
      <Input type="password" label="Password" {...register('password')} />
      <Input type="password" label="Confirm password" {...register('passwordConfirm')} />
      <Button type="submit">I'm excited!</Button>
      <div className="text-gray text-sm mx-auto">
        Already have an account?
        <span className="text-light-blue cursor-pointer" onClick={() => navigate('/login')}>
          {' '}
          Login
        </span>
      </div>
    </AuthLayout>
  )
}

export default Register
