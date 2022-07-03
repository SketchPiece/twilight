import { yupResolver } from '@hookform/resolvers/yup'
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormProps,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form'

type UseFormCustomRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>
) => UseFormRegisterReturn<TFieldName> & { error: string | undefined }

interface UseFormCustomReturn<TFieldValues, TContext>
  extends UseFormReturn<TFieldValues, TContext> {
  register: UseFormCustomRegister<TFieldValues>
}

/**
 * Hook changes default behavior of useForm hook, uses yupResolver by default and returns custom register with error message inside
 */
export const useCustomForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props?: UseFormProps<TFieldValues, TContext> & { validationSchema?: any }
): UseFormCustomReturn<TFieldValues, TContext> => {
  const values = useForm<TFieldValues, TContext>({
    ...props,
    resolver: props?.resolver ? props.resolver : yupResolver(props?.validationSchema),
  })
  const customRegister: UseFormCustomRegister<TFieldValues> = (...args) => {
    const error = values.formState.errors[args[0]]?.message as string | undefined
    return { ...values.register(...args), error }
  }

  return { ...values, register: customRegister }
}
