import {
  MenuAlt3Icon,
  MenuAlt2Icon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
// import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  toggleLeftSidebar: () => void
  leftSidebarEnabled: boolean
  toggleRightSidebar?: () => void
  rightSidebarEnabled: boolean
  headerContent?: ReactNode
}

const Header = ({
  toggleLeftSidebar,
  leftSidebarEnabled,
  toggleRightSidebar,
  rightSidebarEnabled,
  headerContent,
}: Props) => {
  return (
    <div className="sticky top-0 h-12 px-3 py-1">
      <div className="flex items-center justify-between">
        <button
          className={classNames('btn-square btn btn-sm btn-ghost', {
            'btn-active': leftSidebarEnabled,
          })}
          onClick={toggleLeftSidebar}
        >
          <MenuAlt2Icon className="w-6 h-6" />
        </button>
        {headerContent}
        <div className="flex items-center justify-between">
          <button className={classNames('btn-square btn btn-sm btn-ghost')}>
            <QuestionMarkCircleIcon className="w-6 h-6" />
          </button>
          {toggleRightSidebar && (
            <button
              className={classNames('btn-square btn btn-sm btn-ghost', {
                'btn-active': rightSidebarEnabled,
              })}
              onClick={toggleRightSidebar}
            >
              <MenuAlt3Icon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
