/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-50': 'var(--twt-accent-50)',
        'accent-100': 'var(--twt-accent-100)',
        'accent-200': 'var(--twt-accent-200)',
        'accent-300': 'var(--twt-accent-300)',
        'accent-400': 'var(--twt-accent-400)',
        'accent-500': 'var(--twt-accent-500)',
        'accent-600': 'var(--twt-accent-600)',
        'accent-700': 'var(--twt-accent-700)',
        'accent-800': 'var(--twt-accent-800)',
        'accent-900': 'var(--twt-accent-900)',

        'primary-50': 'var(--twt-primary-50)',
        'primary-100': 'var(--twt-primary-100)',
        'primary-200': 'var(--twt-primary-200)',
        'primary-300': 'var(--twt-primary-300)',
        'primary-400': 'var(--twt-primary-400)',
        'primary-500': 'var(--twt-primary-500)',
        'primary-600': 'var(--twt-primary-600)',
        'primary-700': 'var(--twt-primary-700)',
        'primary-800': 'var(--twt-primary-800)',
        'primary-900': 'var(--twt-primary-900)',

        onLight: 'var(--twt-onLight)',
        onDark: 'var(--twt-onDark)',
        accentBorder: 'var(--twt-accentBorder)',
        backdrop: 'var(--twt-backdrop)',
      },
    },
    fontFamily: {
      wide: ['Montserrat', 'ui-sans-serif'],
      merriweather: ['Merriweather', 'ui-sans-serif'],
    },
  },
  plugins: [],
}
