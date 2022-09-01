import classNames from 'classnames'
import { ReactNode } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useIsHydrated } from '../contexts/isHydrated'

interface Tab {
  name: string
  icon?: ReactNode
}

interface Props {
  tabs: Tab[]
  defaultTabName: string
  tabChildren: { [key: string]: ReactNode }
  localStorageKey: string
  className?: string
}

const Tabs = ({
  tabs,
  defaultTabName,
  tabChildren,
  localStorageKey,
  className = '',
}: Props) => {
  const isHydrated = useIsHydrated()

  const [selected, setSelected] = useLocalStorageState(localStorageKey, {
    defaultValue: defaultTabName,
    ssr: true,
  })

  return (
    <div className={className}>
      <div className="mb-4 tabs">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            className={classNames('tab tab-bordered no-underline px-12', {
              'tab-active': isHydrated && selected === tab.name,
            })}
            onClick={() => setSelected(tab.name)}
          >
            {tab.name}
            {tab.icon ? <div className="ml-1">{tab.icon}</div> : null}
          </a>
        ))}
      </div>
      {tabChildren[selected] || null}
    </div>
  )
}

export default Tabs
