import { Transition } from '@headlessui/react'
import react from 'react'
import { useLocalStorage } from 'usehooks-ts'
// import { useLocalStorage } from 'usehooks-ts'
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
    <div className="flex w-full min-h-screen h-fit">
      <Transition
        show={leftSidebarEnabled}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="flex flex-col border-r not-prose bg-base-200 w-fit border-base-300"
      >
        <Nav />
      </Transition>
      <div className="w-full overflow-y-auto">
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
        <div className="max-w-6xl px-2 py-8 mx-auto overflow md:p-8 xl:p-16">
          {children}
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
