import { BriefcaseIcon, CalendarIcon, SunIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import Header from './Header'
import Scrawl from './icons/Scrawl'
import Link from './Link'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const [sidebarEnabled, setSidebarEnabled] = useLocalStorage(
    'sidebarEnabled',
    false
  )

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div
        className={classNames('not-prose bg-base-200', {
          hidden: !sidebarEnabled,
          'flex flex-col': sidebarEnabled,
        })}
      >
        <ul className="flex p-2 w-56 menu rounded-box">
          <li>
            <a>
              <SunIcon className="w-4 h-4" />
              Today
            </a>
          </li>
          <li>
            <a>
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </a>
          </li>
          <li>
            <a>
              <BriefcaseIcon className="w-4 h-4" />
              Projects
            </a>
          </li>
        </ul>

        <Link
          href="/"
          className="flex gap-2 justify-center items-center p-4 mt-auto prose link link-hover"
        >
          <Scrawl size={24} />
          <h2 className="font-heading">Scrawl</h2>
        </Link>
      </div>
      <div className="overflow-y-auto w-full">
        <Header
          sidebarEnabled={sidebarEnabled}
          toggleSidebar={() => setSidebarEnabled(!sidebarEnabled)}
        />
        <div className="px-2 py-8 mx-auto max-w-6xl overflow md:p-8 xl:p-16">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
