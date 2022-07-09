/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{html,js,tsx}'],
	theme: {
		colors: {
			'space-gray': '#343248',
			'gray': '#6E7279',
			'deep-dark': '#22212D',
			'white': '#FFFFFF',
			'red': '#FF4569',
			'purple': {
				900: '#5A1BC0',
				800: '#7228EC',
				700: '#884BED',
				600: '#8D47FF',
			},
			'mulled-wine': '#4B4961',
			'purple-hover': '#5A1BC0',
			'light-blue': '#05A5E4',
			'light-gray': '#B0B0B0',
			'oslo-gray': '#86888D',
			'steel-gray': '#28263B',
			'online': '#00E576',
			'idle': '#FFC401',
			'busy': '#E23106',
			'invisible': '#939393',
		},
		extend: {},
	},
	plugins: [],
}
