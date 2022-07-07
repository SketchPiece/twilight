import AuthLayout from 'components/Layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useCustomForm } from 'hooks'
import { Input } from 'components'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { AuthData, authSelector, registration } from 'store/user'
import { useEffect } from 'react'

const registerSchema = yup.object({
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
	passwordConfirm: yup
		.string()
		.required('is a required field')
		.oneOf([yup.ref('password'), null], 'should be the same as password'),
})

interface FieldValues extends AuthData {
	passwordConfirm: string
}

export const Register = () => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(authSelector)

	const onRegister = (data: FieldValues) => dispatch(registration(data))

	const { register, handleSubmit } = useCustomForm<FieldValues>({
		validationSchema: registerSchema,
	})

	useEffect(() => {
		if (isAuth) navigate('/chat')
	}, [isAuth])

	return (
		<AuthLayout>
			<form className="auth-form" onSubmit={handleSubmit(onRegister)}>
				<span className="text-2xl font-bold mx-auto text-white">Register</span>
				<Input autoFocus label="Nickname" dataCy="nickname" {...register('nickname')} />
				<Input label="Password" type="password" dataCy="password" {...register('password')} />
				<Input
					label="Confirm password"
					type="password"
					dataCy="passwordConfirm"
					{...register('passwordConfirm')}
				/>
				<button data-cy="submit" className="button">
					I'm excited!
				</button>
				<div className="text-gray text-sm mx-auto">
					Already have an account?
					<span
						data-cy="switch"
						className="text-light-blue cursor-pointer"
						onClick={() => navigate('/login')}
					>
						{' '}
						Login
					</span>
				</div>
			</form>
		</AuthLayout>
	)
}

export default Register
