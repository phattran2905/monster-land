/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		fontFamily: {
			body: ['Exo', 'sans-serif'],
			heading: ['Mali', 'cursive'],
		},
		extend: {
			colors: {
				'Indigo-Blue': '#393E7D',
				'Royal-Blue': '#3F4589',
				'Light-Indigo-Blue': '#E3E4F2',
				'Flamingo-Pink': '#E5446D',
				'Amethyst-Purple': '#D7B1FD',
				'Gold-Sand': '#ECD07C',
				'Fresh-Green': '#D2FF89',
				'Light-Green': '#E5FFDB',
				'Forest-Green': '#2C8837',
				'Fire-Engine-Red': '#DB0039',
				'Forest-Moss': '#52796F',
				'Midnight-Gray': '#464865',
				'Dim-Gray': '#6C6F7D',
				'Light-Gray': '#BFBFC6',
				'Anti-flash-white': '#E9EAEC',
				white: '#ffffff',
				'light-white': '#F7F7F7',
				black: '#1B1B1E',

				// Bg-color for monster's type
				Fire: '#ff0000',
				Water: '#3C91E6',
				Normal: '#808080',
				Electric: '#FBFF12',

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			backgroundImage: {
				'background-img-1': "url('/img/bg/bg-1.png')",
				'background-img-2': "url('/img/bg/bg-2.png')",
				'background-img-3': "url('/img/bg/bg-3.png')",
				'background-img-4': "url('/img/bg/bg-4.png')",
				'background-img-5': "url('/img/bg/bg-5.png')",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				// Source code: https://loading.io/css/
				'lds-ripple': {
					'0%': {
						top: '36px',
						left: '36px',
						width: 0,
						height: 0,
						opacity: 0,
					},
					'4.9%': {
						top: '36px',
						left: '36px',
						width: 0,
						height: 0,
						opacity: 0,
					},
					'5%': {
						top: '36px',
						left: '36px',
						width: 0,
						height: 0,
						opacity: 1,
					},
					'100%': {
						top: 0,
						left: 0,
						width: '72px',
						height: '72px',
						opacity: 0,
					},
				},
				// Source code: https://loading.io/css/
				'lds-ellipsis1': {
					'0%': {
						transform: 'scale(0)',
					},
					'100%': {
						transform: 'scale(1)',
					},
				},
				'lds-ellipsis2': {
					'0%': {
						transform: 'translate(0, 0)',
					},
					'100%': {
						transform: 'translate(24px, 0)',
					},
				},
				'lds-ellipsis3': {
					'0%': {
						transform: 'scale(1)',
					},
					'100%': {
						transform: 'scale(0)',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'ripple-1': 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
				'ripple-2': 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite -0.5s',
				'ellipsis-1': 'lds-ellipsis1 0.6s infinite',
				'ellipsis-2': 'lds-ellipsis2 0.6s infinite',
				'ellipsis-3': 'lds-ellipsis2 0.6s infinite',
				'ellipsis-4': 'lds-ellipsis3 0.6s infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
		screens: {
			xs: '480px',
			sm: '768px',
			md: '1060px',
		},
	},
	plugins: [require('tailwindcss-animate')],
}
