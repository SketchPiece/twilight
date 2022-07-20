import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import EnvironmentPlugin from 'vite-plugin-environment'
import vitePluginRequire from 'vite-plugin-require'
// import requireTransform from 'vite-plugin-require-transform'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
		vitePluginRequire(),
	],
	server: {
		proxy: {
			'/api': {
				target: 'https://twilight-app.herokuapp.com',
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
