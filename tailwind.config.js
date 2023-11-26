/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			width: {
				"w-128": "32rem",
			},
		},
	},
	plugins: [],
};
