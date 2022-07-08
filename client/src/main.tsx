/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './global.css'
import { Provider as StoreProvider } from 'react-redux'
import store from 'store'

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
