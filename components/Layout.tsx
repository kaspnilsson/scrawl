import { Transition } from '@headlessui/react'
import react from 'react'
import { useLocalStorage } from 'usehooks-ts'
import BottomNav from './BottomNav'
import Header from './Header'
import Nav from './Nav'

interface Props {
  children: react.ReactNode
  rightContent?: react.ReactNode
  headerContent?: react.ReactNode
}

const Layout = ({ children, rightContent, headerContent }: Props) => {
  const [rightSidebarEnabled, setRightSidebarEnabled] = useLocalStorage(
    'rightSidebarEnabled',
    false
  )
  const [leftSidebarEnabled, setLeftSidebarEnabled] = useLocalStorage(
    'leftSidebarEnabled',
    false
  )

  return (
    <div className="flex w-full min-h-screen">
      <Transition
        show={leftSidebarEnabled}
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
      <div className="w-full max-h-screen min-h-0 overflow-auto">
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
        <div className="max-w-6xl px-2 py-4 mx-auto overflow-y-auto md:p-8 xl:px-16">
          {children}
          <BottomNav
            leftSidebarEnabled={leftSidebarEnabled}
            toggleLeftSidebar={() => setLeftSidebarEnabled(!leftSidebarEnabled)}
          />
        </div>
      </div>
      <Transition
        show={rightSidebarEnabled}
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
