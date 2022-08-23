import {
  MenuAlt3Icon,
  MenuAlt2Icon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
// import { useUser } from '@supabase/auth-helpers-react'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  toggleLeftSidebar: () => void
  toggleRightSidebar?: () => void
  headerContent?: ReactNode
}

const Header = ({
  toggleLeftSidebar,
  toggleRightSidebar,
  headerContent,
}: Props) => (
  <div className="sticky top-0 z-10 flex items-center h-12 px-3 py-1 bg-opacity-50 border-b backdrop-blur-md bg-base-100 border-normal">
    <div className="flex items-center justify-between w-full">
      <button
        className="hidden btn-square btn btn-sm btn-ghost sm:flex"
        onClick={toggleLeftSidebar}
      >
        <MenuAlt2Icon className="w-6 h-6" />
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
            <MenuAlt3Icon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  </div>
)
export default Header
