import { initTwThemes } from 'tw-themes'

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
  light: { contextColors: gen('stone', 'violet') },
  dark: { contextColors: { ...gen('stone', 'violet'), border: 'stone-700' } },
}
const initialThemeName = 'light' // AI: ENHANCE TO pull from local storage

const TwThemes = initTwThemes(schema, themes, initialThemeName)
export default TwThemes
