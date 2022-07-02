import { yupResolver } from '@hookform/resolvers/yup'
import { Path, useForm } from 'react-hook-form'

// this hook change register of useForm so it will spread error too

export const useErrorForm = <T>(schema: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ resolver: yupResolver(schema) })
  const customRegister = (field: Path<T>) => {
    return { ...register(field), error: errors[field]?.message }
  }

  return { register: customRegister, handleSubmit }
}
