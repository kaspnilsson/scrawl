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
          primary: '#b8b8b8',
          secondary: '#b8b8b8',
          accent: '#b8b8b8',
          neutral: '#ebebeb',
          'base-100': '#ffffff',
          'base-200': '#eeeeee',
          'base-300': '#dddddd',
          info: '#0000ff',
          success: '#008000',
          warning: '#a6a659',
          error: '#ff0000',
        },
        // dark: {
        //   primary: '#343232',
        //   secondary: '#343232',
        //   accent: '#343232',
        //   neutral: '#272626',
        //   'base-100': '#000000',
        //   'base-200': '#0D0D0D',
        //   'base-300': '#1A1919',
        //   info: '#0000ff',
        //   success: '#008000',
        //   warning: '#ffff00',
        //   error: '#ff0000',
        // },
      },
    ],
  },
}
