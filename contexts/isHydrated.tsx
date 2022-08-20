import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
} from 'react'

const IsHydratedContext = createContext(false)

export const IsHydratedProvider = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  const useEffectFn =
    typeof window === 'undefined' ? useEffect : useLayoutEffect

  useEffectFn(() => {
    setIsHydrated(true)
  }, [])

  return (
    <IsHydratedContext.Provider value={isHydrated}>
      {children}
    </IsHydratedContext.Provider>
  )
}

export const useIsHydrated = () => useContext(IsHydratedContext)
