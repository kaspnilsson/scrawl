import { Transition } from '@headlessui/react'
import react from 'react'
import BottomNav from './BottomNav'
import ErrorView from './Error'
import Header from './Header'
import Nav from './Nav'
import useLocalStorageState from 'use-local-storage-state'
import { useIsHydrated } from '../contexts/isHydrated'
import classNames from 'classnames'
import Head from 'next/head'

interface Props {
  children: react.ReactNode
  rightContent?: react.ReactNode
  headerContent?: react.ReactNode
  loading?: boolean
  noMaxWidth?: boolean
  error?: Error
  title?: string
}

const Layout = ({
  children,
  rightContent,
  headerContent,
  loading,
  error,
  noMaxWidth = false,
  title = 'Scrawl',
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
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex w-full overflow-hidden max-w-[100vw] prose-stone prose">
        <Transition
          show={isHydrated && leftSidebarEnabled}
          enter="transition ease-in-out duration-100 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-100 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="flex flex-col border-r flex-0 not-prose bg-base-200 w-fit border-neutral"
        >
          <Nav />
        </Transition>
        <div className="flex-1 w-full max-w-full max-h-screen min-h-0 overflow-hidden">
          <Header
            toggleLeftSidebar={() => setLeftSidebarEnabled(!leftSidebarEnabled)}
            toggleRightSidebar={
              rightContent
                ? () => setRightSidebarEnabled(!rightSidebarEnabled)
                : undefined
            }
            leftSidebarEnabled={leftSidebarEnabled}
            rightSidebarEnabled={rightSidebarEnabled}
            headerContent={headerContent}
          />
          <div className="flex h-full overflow-auto">
            <div
              className={classNames(
                'flex-1 px-2 py-4 mx-auto mb-36 max-w-full sm:p-8 xl:px-16 min-w-fit h-fit',
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
            </div>
            <BottomNav
              leftSidebarEnabled={leftSidebarEnabled}
              toggleLeftSidebar={() =>
                setLeftSidebarEnabled(!leftSidebarEnabled)
              }
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
    </>
  )
}

export default Layout
