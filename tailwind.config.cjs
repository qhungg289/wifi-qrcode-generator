/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "1rem"
			},
			fontFamily: {
				"ibm-plex-sans": ["IBM Plex Sans", "sans-serif"]
			}
		}
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
