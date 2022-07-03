import { ComponentProps, FC, ReactNode } from 'react'
import { Route } from 'react-router-dom'

interface PublicRouteProps {
	element: ReactNode
	restricted?: boolean
}

export const PublicRoute: FC<PublicRouteProps> = ({ element, restricted }) => {
	return <>{element}</>
}
