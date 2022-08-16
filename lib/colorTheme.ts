import { initTwThemes } from 'tw-themes'

// Always returns false rn
export const prefersDarkMode = () =>
  !!(
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    false
  )

const schema = [
  'accent-50',
  'accent-100',
  'accent-200',
  'accent-300',
  'accent-400',
  'accent-500',
  'accent-600',
  'accent-700',
  'accent-800',
  'accent-900',

  'primary-50',
  'primary-100',
  'primary-200',
  'primary-300',
  'primary-400',
  'primary-500',
  'primary-600',
  'primary-700',
  'primary-800',
  'primary-900',

  'onLight', // typically black
  'onDark', // typically white

  'border', // typically a gray tone (e.g. 'coolGray-600')
  // ... used for borders in SideBar/NavBar/Menu/Dialog/etc.

  'backdrop', // universal background
  // ... can be a gray tone       (e.g. 'coolGray-200')
  // ... or lighter primary shade (e.g. `${primary}-100`)
  //     ... lighter that 'primaryLight'
  //         providing NOT too much of same color
]

const gen = (primary: string, accent: string) => ({
  'accent-50': `${accent}-50`,
  'accent-100': `${accent}-100`,
  'accent-200': `${accent}-200`,
  'accent-300': `${accent}-300`,
  'accent-400': `${accent}-400`,
  'accent-500': `${accent}-500`,
  'accent-600': `${accent}-600`,
  'accent-700': `${accent}-700`,
  'accent-800': `${accent}-800`,
  'accent-900': `${accent}-900`,

  'primary-50': `${primary}-50`,
  'primary-100': `${primary}-100`,
  'primary-200': `${primary}-200`,
  'primary-300': `${primary}-300`,
  'primary-400': `${primary}-400`,
  'primary-500': `${primary}-500`,
  'primary-600': `${primary}-600`,
  'primary-700': `${primary}-700`,
  'primary-800': `${primary}-800`,
  'primary-900': `${primary}-900`,

  onLight: `${primary}-900`,
  onDark: 'white',

  border: `${primary}-300`,

  backdrop: `${primary}-50`,
})

const themes = {
  light: {
    contextColors: {
      'accent-50': `violet-50`,
      'accent-100': `violet-100`,
      'accent-200': `violet-200`,
      'accent-300': `violet-300`,
      'accent-400': `violet-400`,
      'accent-500': `violet-500`,
      'accent-600': `violet-600`,
      'accent-700': `violet-700`,
      'accent-800': `violet-800`,
      'accent-900': `violet-900`,

      'primary-50': `stone-50`,
      'primary-100': `stone-100`,
      'primary-200': `stone-200`,
      'primary-300': `stone-300`,
      'primary-400': `stone-400`,
      'primary-500': `stone-500`,
      'primary-600': `stone-600`,
      'primary-700': `stone-700`,
      'primary-800': `stone-800`,
      'primary-900': `stone-900`,

      onLight: `stone-900`,
      onDark: 'white',

      border: `stone-300`,

      backdrop: `white`,
    },
  },
  dark: {
    contextColors: {
      'accent-900': `violet-50`,
      'accent-800': `violet-100`,
      'accent-700': `violet-200`,
      'accent-600': `violet-300`,
      'accent-500': `violet-400`,
      'accent-400': `violet-500`,
      'accent-300': `violet-600`,
      'accent-200': `violet-700`,
      'accent-100': `violet-800`,
      'accent-50': `violet-900`,

      'primary-900': `stone-50`,
      'primary-800': `stone-100`,
      'primary-700': `stone-200`,
      'primary-600': `stone-300`,
      'primary-500': `stone-400`,
      'primary-400': `stone-500`,
      'primary-300': `stone-600`,
      'primary-200': `stone-700`,
      'primary-100': `stone-800`,
      'primary-50': `stone-900`,

      backdrop: `white`,
      border: 'stone-700',
      onLight: 'white',
      onDark: 'stone-900',
    },
  },
}
const themeName = prefersDarkMode() ? 'dark' : 'light' // AI: ENHANCE TO pull from local storage
const TwThemes = initTwThemes(schema, themes, 'light')
export default TwThemes
