import { PrivateRoute, PublicRoute } from 'components'
import { Chat } from 'pages/Chat'
import Login from 'pages/Login'
import Register from 'pages/Register'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route index element={<PrivateRoute element={<Chat />} />} />
			<Route path="login" element={<PublicRoute element={<Login />} restricted />} />
			<Route path="register" element={<PublicRoute element={<Register />} restricted />} />
		</Routes>
	)
}

export default App
