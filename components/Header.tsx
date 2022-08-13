import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { login } from '../lib/routes'
import Scrawl from './icons/Scrawl'
// import { useUser } from '@supabase/auth-helpers-react'
import Link from './Link'
import classNames from 'classnames'
import { useUserContext } from '../contexts/userProfile'

const Header = () => {
  const { user, logout } = useUserContext()

  return (
    <Popover className="sticky top-0 bg-onDark">
      <div className="border-b border-primary-900">
        <div className="flex items-center justify-between px-4 py-6 max-w-7xl mx-fauto md:justify-start md:space-x-10 sm:px-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href={login}
              className="flex items-center gap-3 text-2xl font-merriweather hover:underline"
            >
              <Scrawl size={40}></Scrawl>
              Scrawl
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md bg-onDark text-primary-400 hover:text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm rounded-full bg-onDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    {user.avatar_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-10 h-10 border rounded-full border-onLight"
                        src={user.avatar_url}
                        alt="User profile photo"
                      />
                    )}
                    {!user.avatar_url && <span>?</span>}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-onDark ring-1 ring-onLight ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active ? 'bg-primary-100' : '',
                            'block px-4 py-2 w-full text-sm text-primary-700 text-start'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {!user && <Link href={login}>Log in</Link>}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="divide-y-2 rounded-lg shadow-lg bg-onDark ring-1 ring-opacity-5 ring-primary-900 divide-primary-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <a
                  href={login}
                  className="flex items-center gap-3 text-2xl font-wide"
                >
                  <Scrawl size={40}></Scrawl>
                  SCRAWL
                </a>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md bg-onDark text-primary-400 hover:text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8"></nav>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium border border-transparent rounded-md shadow-sm text-onDark bg-primary-600 hover:bg-primary-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-base font-medium text-center text-primary-500">
                  Existing customer?{' '}
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header
