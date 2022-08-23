import { Transition } from '@headlessui/react'
import react from 'react'
import BottomNav from './BottomNav'
import ErrorView from './Error'
import Header from './Header'
import Nav from './Nav'
import useLocalStorageState from 'use-local-storage-state'
import { useIsHydrated } from '../contexts/isHydrated'
import classNames from 'classnames'

interface Props {
  children: react.ReactNode
  rightContent?: react.ReactNode
  headerContent?: react.ReactNode
  loading?: boolean
  noMaxWidth?: boolean
  error?: Error
}

const Layout = ({
  children,
  rightContent,
  headerContent,
  loading,
  error,
  noMaxWidth = false,
}: Props) => {
  const isHydrated = useIsHydrated()

  const [rightSidebarEnabled, setRightSidebarEnabled] =
    useLocalStorageState<boolean>('rightSidebarEnabled', {
      defaultValue: false,
      ssr: true,
    })

  const [leftSidebarEnabled, setLeftSidebarEnabled] = useLocalStorageState(
    'leftSidebarEnabled',
    { defaultValue: false, ssr: true }
  )

  if (!isHydrated) return null
  return (
    <div className="flex w-full min-h-screen">
      <Transition
        show={isHydrated && leftSidebarEnabled}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="flex flex-col flex-1 h-screen border-r not-prose bg-base-200 w-fit border-base-300"
      >
        <Nav />
      </Transition>
      <div className="overflow-auto w-full min-h-0 max-h-screen">
        <Header
          leftSidebarEnabled={leftSidebarEnabled}
          toggleLeftSidebar={() => setLeftSidebarEnabled(!leftSidebarEnabled)}
          rightSidebarEnabled={rightSidebarEnabled}
          toggleRightSidebar={
            rightContent
              ? () => setRightSidebarEnabled(!rightSidebarEnabled)
              : undefined
          }
          headerContent={headerContent}
        />
        <div
          className={classNames(
            'overflow-y-auto px-2 py-4 mx-auto h-full sm:p-8 xl:px-16',
            { 'max-w-6xl': !noMaxWidth }
          )}
        >
          {loading && (
            <div className="flex p-16 m-auto loading btn btn-ghost">
              Loading
            </div>
          )}
          {!loading && error && <ErrorView error={error as Error} />}
          {!loading && !error && children}
          <BottomNav
            leftSidebarEnabled={leftSidebarEnabled}
            toggleLeftSidebar={() => setLeftSidebarEnabled(!leftSidebarEnabled)}
          />
        </div>
      </div>
      <Transition
        show={isHydrated && rightSidebarEnabled}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="flex flex-col not-prose bg-base-200 w-fit"
      >
        {rightContent || ''}
      </Transition>
    </div>
  )
}

export default Layout
