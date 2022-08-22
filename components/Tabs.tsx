import classNames from 'classnames'
import { ReactNode } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useIsHydrated } from '../contexts/isHydrated'

interface Props {
  tabNames: string[]
  defaultTab: string
  tabChildren: { [key: string]: ReactNode }
  localStorageKey: string
}

const Tabs = ({
  tabNames,
  defaultTab,
  tabChildren,
  localStorageKey,
}: Props) => {
  const isHydrated = useIsHydrated()

  const [selected, setSelected] = useLocalStorageState(localStorageKey, {
    defaultValue: defaultTab,
    ssr: true,
  })

  return (
    <div>
      <div className="mb-4 tabs">
        {tabNames.map((name) => (
          <a
            key={name}
            className={classNames(
              'tab tab-bordered no-underline font-heading px-12 text-lg',
              {
                'tab-active': isHydrated && selected === name,
              }
            )}
            onClick={() => setSelected(name)}
          >
            {name}
          </a>
        ))}
      </div>
      {tabChildren[selected] || null}
    </div>
  )
}

export default Tabs
