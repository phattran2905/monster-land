/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
        colors: {
            'primary': '#393E7D',
            'secondary': '#E5446D',
            'diamond': '#D7B1FD',
            'coins': '#ECD07C',
            'stamina': '#D2FF89',
            'success': '#2C8837',
            'fail': '#DB0039',
            'level': '#52796F'
        },
		extend: {},
	},
	plugins: [],
}
