/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.6rem',
      },
    },
    fontFamily: {
      wide: ['Montserrat', 'ui-sans-serif'],
      merriweather: ['Merriweather', 'ui-sans-serif'],
      heading: ['Clash', 'ui-sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#d6d3d1', // TW stone 300
          secondary: '#d6d3d1', // TW stone 300
          accent: '#7dd3fc', // TW sky 300
          neutral: '#e7e5e4', // TW stone 200
          'base-100': '#ffffff', // White
          'base-200': '#f5f5f4', // TW stone 100
          'base-300': '#d6d3d1', // TW stone 300
          info: '#c4b5fd', // TW violet 300
          success: '#86efac', // TW green 300
          warning: '#fcd34d', // TW amber 300
          error: '#fca5a5', // TW red 300
        },
        dark: {
          primary: '#44403c', // TW stone 700
          secondary: '#44403c', // TW stone 700
          accent: '#0284c7', // TW sky 600
          'accent-focus': '#0ea5e9', // TW sky 500
          neutral: '#292524', // TW stone 800
          'base-100': '#000000', // Black
          'base-200': '#0e0d0c', // TW stone that i made up
          'base-300': '#151312', // TW stone that i made up
          info: '#6d28d9', // TW violet 700
          success: '#15803d', // TW green 700
          warning: '#b45309', // TW amber 700
          error: '#b91c1c', // TW red 700
        },
      },
    ],
  },
}
