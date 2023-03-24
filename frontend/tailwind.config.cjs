/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"Indigo-Blue": "#393E7D",
			"Royal-Blue": "#3F4589",
			"Flamingo-Pink": "#E5446D",
			"Amethyst-Purple": "#D7B1FD",
			"Gold-Sand": "#ECD07C",
			"Fresh-Green": "#D2FF89",
			"Forest-Green": "#2C8837",
			"Fire-Engine-Red": "#DB0039",
			"Forest-Moss": "#52796F",
			"Midnight-Gray": "#464865",
			"Dim-Gray": "#6C6F7D",
			"Anti-flash-white": "#E9EAEC",
			white: "#ffffff",
			black: "#1B1B1E",
            
            // Bg-color for monster's type
            Fire: '#ff0000',
            Water: '#3C91E6',
            Normal: '#808080',
            Electric: '#FBFF12',
              
		},
		extend: {
			backgroundImage: {
				"background-img-1": "url('/img/bg/bg-1.png')",
				"background-img-2": "url('/img/bg/bg-2.png')",
				"background-img-3": "url('/img/bg/bg-3.png')",
				"background-img-4": "url('/img/bg/bg-4.png')",
				"background-img-5": "url('/img/bg/bg-5.png')",
			},
			keyframes: {
				// Source code: https://loading.io/css/
				"lds-ripple": {
					"0%": {
						top: "36px",
						left: "36px",
						width: 0,
						height: 0,
						opacity: 0,
					},
					"4.9%": {
						top: "36px",
						left: "36px",
						width: 0,
						height: 0,
						opacity: 0,
					},
					"5%": {
						top: "36px",
						left: "36px",
						width: 0,
						height: 0,
						opacity: 1,
					},
					"100%": {
						top: 0,
						left: 0,
						width: "72px",
						height: "72px",
						opacity: 0,
					},
				},
			},

			animation: {
				"ripple-1": "lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
				"ripple-2": "lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite -0.5s",
			},
		},
	},
	plugins: [],
}
