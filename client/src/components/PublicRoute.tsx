import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from 'store/auth'
import { useAppSelector } from 'store/hooks'

interface PublicRouteProps {
	element: ReactNode
	restricted?: boolean
	replace?: string
}

export const PublicRoute: FC<PublicRouteProps> = ({ element, restricted, replace = '/' }) => {
	const user = useAppSelector(selectUser)

	if (restricted && user) return <Navigate to={replace} replace />

	return <>{element}</>
}
