import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
interface PrivateRouteProps {
	element: ReactNode
	isAuth: boolean
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element, isAuth }) => {
	if (!isAuth) return <Navigate to="/login" replace />
	return <>{element}</>
}
