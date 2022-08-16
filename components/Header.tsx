import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { login } from '../lib/routes'
import Scrawl from './icons/Scrawl'
// import { useUser } from '@supabase/auth-helpers-react'
import Link from './Link'
import classNames from 'classnames'
import { useUserContext } from '../contexts/userProfile'
import Button from './Button'

interface Props {
  toggleSidebar: () => void
  sidebarEnabled: boolean
}

const Header = ({ toggleSidebar, sidebarEnabled }: Props) => {
  const { user, logout } = useUserContext()

  return (
    <div className="sticky top-0 p-3">
      <div className="flex justify-between items-center">
        <button
          className={classNames('btn-square btn btn-sm btn-ghost', {
            'btn-active': sidebarEnabled,
          })}
          onClick={toggleSidebar}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Header
