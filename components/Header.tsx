import {
  MenuAlt3Icon,
  MenuAlt2Icon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
// import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'

interface Props {
  toggleLeftSidebar: () => void
  leftSidebarEnabled: boolean
  toggleRightSidebar: () => void
  rightSidebarEnabled: boolean
}

const Header = ({
  toggleLeftSidebar,
  leftSidebarEnabled,
  toggleRightSidebar,
  rightSidebarEnabled,
}: Props) => {
  return (
    <div className="sticky top-0 p-3">
      <div className="flex justify-between items-center">
        <button
          className={classNames('btn-square btn btn-sm btn-ghost', {
            'btn-active': leftSidebarEnabled,
          })}
          onClick={toggleLeftSidebar}
        >
          <MenuAlt2Icon className="w-6 h-6" />
        </button>
        <div className="flex justify-between items-center">
          <button className={classNames('btn-square btn btn-sm btn-ghost')}>
            <QuestionMarkCircleIcon className="w-6 h-6" />
          </button>
          <button
            className={classNames('btn-square btn btn-sm btn-ghost', {
              'btn-active': rightSidebarEnabled,
            })}
            onClick={toggleRightSidebar}
          >
            <MenuAlt3Icon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
