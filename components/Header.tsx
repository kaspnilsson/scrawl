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
    <Popover className="sticky top-0 bg-white">
      <div className="border-b border-stone-900">
        <div className="flex justify-between items-center px-4 py-6 max-w-7xl mx-fauto md:justify-start md:space-x-10 sm:px-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href={login}
              className="flex gap-3 items-center text-2xl font-merriweather hover:underline"
            >
              <Scrawl size={40}></Scrawl>
              Scrawl
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex justify-center items-center p-2 bg-white rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden justify-end items-center md:flex md:flex-1 lg:w-0">
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
                    <span className="sr-only">Open user menu</span>
                    {user.avatar_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-10 h-10 rounded-full border border-black"
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
                  <Menu.Items className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active ? 'bg-stone-100' : '',
                            'block px-4 py-2 w-full text-sm text-stone-700 text-start'
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
          className="absolute inset-x-0 top-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="bg-white rounded-lg divide-y-2 ring-1 ring-opacity-5 shadow-lg ring-stone-900 divide-stone-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex justify-between items-center">
                <a
                  href={login}
                  className="flex gap-3 items-center text-2xl font-wide"
                >
                  <Scrawl size={40}></Scrawl>
                  SCRAWL
                </a>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex justify-center items-center p-2 bg-white rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500">
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
                  className="flex justify-center items-center px-4 py-2 w-full text-base font-medium text-white rounded-md border border-transparent shadow-sm bg-stone-600 hover:bg-stone-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-base font-medium text-center text-stone-500">
                  Existing customer?{' '}
                  <a href="#" className="text-stone-600 hover:text-stone-500">
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
