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
			'purple': '#7228EC',
			'purple-hover': '#5A1BC0',
			'light-blue': '#05A5E4',
		},
		extend: {},
	},
	plugins: [],
}
