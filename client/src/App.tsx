import { PrivateRoute } from 'components/PrivateRoute'
import { PublicRoute } from 'components/PublicRoute'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			<Route index element={<PrivateRoute element={<Home />} />} />
			<Route path="login" element={<PublicRoute element={<Login />} />} />
			<Route path="register" element={<PublicRoute element={<Register />} />} />
		</Routes>
	)
}

export default App
