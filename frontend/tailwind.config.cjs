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
			white: "#ffffff",
		},
		extend: {
			backgroundImage: {
				"background-img-1": "url('/img/bg/bg-1.png')",
				"background-img-2": "url('/img/bg/bg-2.png')",
				"background-img-3": "url('/img/bg/bg-3.png')",
				"background-img-4": "url('/img/bg/bg-4.png')",
				"background-img-5": "url('/img/bg/bg-5.png')",
			},
		},
	},
	plugins: [],
}
