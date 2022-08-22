import {
  MenuAlt3Icon,
  MenuAlt2Icon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
// import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useIsHydrated } from '../contexts/isHydrated'

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
  const isHydrated = useIsHydrated()

  return (
    <div className="flex sticky top-0 z-10 items-center px-3 py-1 h-12 bg-opacity-50 border-b backdrop-blur-md bg-base-100 border-base-300">
      <div className="flex justify-between items-center w-full">
        <button
          className={classNames(
            'hidden btn-square btn btn-sm btn-ghost sm:flex',
            {
              'btn-active': isHydrated && leftSidebarEnabled,
            }
          )}
          onClick={toggleLeftSidebar}
        >
          <MenuAlt2Icon className="w-6 h-6" />
        </button>
        <div className="flex-1">{headerContent}</div>
        <div className="flex justify-between items-center">
          <button
            className={classNames('hidden btn-square btn btn-sm btn-ghost')}
          >
            <QuestionMarkCircleIcon className="w-6 h-6" />
          </button>
          {toggleRightSidebar && (
            <button
              className={classNames('btn-square btn btn-sm btn-ghost', {
                'btn-active': isHydrated && rightSidebarEnabled,
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
