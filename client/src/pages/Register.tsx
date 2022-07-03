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

interface FieldValues {
	nickname: string
	password: string
	passwordConfirm: string
}

export const Register = () => {
	const navigate = useNavigate()
	//need to get array of errors from yup
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useCustomForm<FieldValues>({
		validationSchema: registerSchema,
	})

	const onRegister = (data: FieldValues) => console.log(data)

	return (
		<AuthLayout onSubmit={handleSubmit(onRegister)}>
			<span className="text-2xl font-bold mx-auto text-white">Register</span>
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
				type="password"
				dataCy="password"
				{...register('password')}
			/>
			<Input
				label="Confirm password"
				type="password"
				autoComplete="password"
				dataCy="passwordConfirm"
				{...register('passwordConfirm')}
			/>
			<Button disabled={!!Object.keys(errors).length} dataCy="submit">
				I'm excited!
			</Button>
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
		</AuthLayout>
	)
}

export default Register
