import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  toggleLeftSidebar: () => void
  leftSidebarEnabled?: boolean
  toggleRightSidebar?: () => void
  rightSidebarEnabled?: boolean
  headerContent?: ReactNode
}

const Header = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  leftSidebarEnabled,
  rightSidebarEnabled,
  headerContent,
}: Props) => (
  <div className="sticky top-0 z-10 flex items-center w-full px-3 py-1 bg-opacity-50 border-b backdrop-blur-md bg-base-100 border-neutral min-h-[3rem]">
    <div className="flex items-center justify-between w-full">
      <button
        className="hidden btn-square btn btn-sm btn-ghost sm:flex"
        onClick={toggleLeftSidebar}
      >
        {leftSidebarEnabled ? (
          <i className="font-thin ri-lg ri-side-bar-fill" />
        ) : (
          <i className="font-thin ri-lg ri-side-bar-line" />
        )}
      </button>
      <div className="flex-1">{headerContent}</div>
      <div className="flex items-center justify-between">
        <button
          className={classNames('hidden btn-square btn btn-sm btn-ghost')}
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
        </button>
        {toggleRightSidebar && (
          <button
            className="btn-square btn btn-sm btn-ghost"
            onClick={toggleRightSidebar}
          >
            {rightSidebarEnabled ? (
              <i className="font-thin rotate-180 ri-lg ri-side-bar-fill" />
            ) : (
              <i className="font-thin rotate-180 ri-lg ri-side-bar-line" />
            )}
          </button>
        )}
      </div>
    </div>
  </div>
)
export default Header
