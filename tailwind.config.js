/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			screens: {
				xs: '480px',
			},
			colors: {
				cl1: '#ffc678',
				cl2: '#ffef70',
				cl3: '#053de5',
				cl4: '#0896ff',
				cl5: ' #8af8fd',
			},
		},
		plugins: [],
	},
};
