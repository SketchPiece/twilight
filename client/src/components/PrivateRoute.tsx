import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from 'store/auth'
import { useAppSelector } from 'store/hooks'

interface PrivateRouteProps {
	element: ReactNode
	replace?: string
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element, replace = '/login' }) => {
	const user = useAppSelector(selectUser)

	if (!user) return <Navigate to={replace} replace />

	return <>{element}</>
}
