import { PublicRoute } from 'components/PublicRoute'
import Chat from 'pages/Chat'
import Login from 'pages/Login'
import Register from 'pages/Register'
import { Route, Routes } from 'react-router-dom'

const App = () => {
	return (
		<Routes>
			{/* <Route index element={<PrivateRoute element={<Chat />} />} /> */}
			<Route path="chat" element={<PublicRoute element={<Chat />} />} />

			<Route path="login" element={<PublicRoute element={<Login />} />} />
			<Route path="register" element={<PublicRoute element={<Register />} />} />
		</Routes>
	)
}

export default App
