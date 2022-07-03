import AuthLayout from 'components/Layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as TwilightLogo } from '../assets/twilight-logo.svg'
import * as yup from 'yup'
import { useCustomForm } from 'hooks'
import { Input } from 'components'

const loginSchema = yup.object({
	nickname: yup
		.string()
		.required('is a required field')
		.min(4, 'is too short')
		.max(15, 'is too long'),
	password: yup
		.string()
		.required('is a required field')
		.min(4, 'is too short')
		.max(20, 'is too long'),
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
		<AuthLayout>
			<form onSubmit={handleSubmit(onLogin)} className="auth-form">
				<span className="text-2xl font-bold mx-auto text-white">Welcome to</span>
				<TwilightLogo className="mx-auto" />
				<Input
					autoFocus
					label="Nickname"
					autoComplete="nickname"
					dataCy="nickname"
					{...register('nickname')}
				/>
				<Input
					label="Password"
					autoComplete="password"
					dataCy="password"
					{...register('password')}
				/>
				<button data-cy="submit" className="button">
					Let's go
				</button>
				<div className="text-gray text-sm mx-auto">
					Need an account?
					<span
						data-cy="switch"
						className="text-light-blue cursor-pointer"
						onClick={() => navigate('/register')}
					>
						{' '}
						Register
					</span>
				</div>
			</form>
		</AuthLayout>
	)
}

export default Login
