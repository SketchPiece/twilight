/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StoreProvider } from 'easy-peasy'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from 'store'
import App from './App'
import './global.css'

const Base = () => (
	<React.StrictMode>
		<StoreProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreProvider>
	</React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<Base />)
