import { FC, ReactNode } from 'react'

interface PrivateRouteProps {
	element: ReactNode
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
	return <>{element}</>
}
