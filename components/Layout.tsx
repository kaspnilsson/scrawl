import classNames from 'classnames'
import { ReactNode } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import Header from './Header'
import Nav from './Nav'

interface Props {
  children: ReactNode
  rightContent: ReactNode
}

const Layout = ({ children, rightContent }: Props) => {
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
      <div
        className={classNames('not-prose bg-base-200', {
          hidden: !leftSidebarEnabled,
          'flex flex-col': leftSidebarEnabled,
        })}
      >
        <Nav />
      </div>
      <div className="overflow-y-auto w-full">
        <Header
          leftSidebarEnabled={leftSidebarEnabled}
          toggleLeftSidebar={() => setLeftSidebarEnabled(!leftSidebarEnabled)}
          rightSidebarEnabled={rightSidebarEnabled}
          toggleRightSidebar={() =>
            setRightSidebarEnabled(!rightSidebarEnabled)
          }
        />
        <div className="px-2 py-8 mx-auto max-w-6xl overflow md:p-8 xl:p-16">
          {children}
        </div>
      </div>
      <div
        className={classNames('not-prose bg-base-200', {
          hidden: !rightSidebarEnabled,
          'flex flex-col': rightSidebarEnabled,
        })}
      >
        {rightContent || ''}
      </div>
    </div>
  )
}

export default Layout
