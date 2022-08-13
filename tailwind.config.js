/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      wide: ['Montserrat', 'ui-sans-serif'],
      merriweather: ['Merriweather', 'ui-sans-serif'],
    },
  },
  plugins: [],
}
