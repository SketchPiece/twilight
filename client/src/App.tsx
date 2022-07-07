import { PrivateRoute } from 'components/PrivateRoute'
import { PublicRoute } from 'components/PublicRoute'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { authSelector, checkAuth } from 'store/user'

const App = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user)

	useEffect(() => {
		if (localStorage.getItem('token')) dispatch(checkAuth())
	}, [])

	return (
		<>
			{user.isLoading ? (
				<>loading</>
			) : (
				<Routes>
					<Route index element={<PrivateRoute isAuth={user.isAuth} element={<Home />} />} />
					<Route path="login" element={<PublicRoute element={<Login />} />} />
					<Route path="register" element={<PublicRoute element={<Register />} />} />
				</Routes>
			)}
		</>
	)
}

export default App
