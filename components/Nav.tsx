import {
  SunIcon,
  CalendarIcon,
  BriefcaseIcon,
  LogoutIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useUserContext } from '../contexts/userProfile'
import { calendar, projects, today } from '../lib/routes'
import Scrawl from './icons/Scrawl'
import Link from './Link'

const LINKS = [
  { text: 'Today', icon: <SunIcon className="w-4 h-4" />, route: today },
  {
    text: 'Calendar',
    icon: <CalendarIcon className="w-4 h-4" />,
    route: calendar,
  },
  {
    text: 'Projects',
    icon: <BriefcaseIcon className="w-4 h-4" />,
    route: projects,
  },
  //   { text: 'Log out', icon: <LogoutIcon className="w-4 h-4" /> },
]

const Nav = () => {
  const { user, logout } = useUserContext()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 justify-between h-full w-fit">
      <ul className="flex p-2 w-56 menu menu-compact lg:menu-normal">
        {LINKS.map(({ text, icon, route }, index) => (
          <li key={index}>
            <Link
              href={route}
              className={router.pathname === route ? 'active' : ''}
            >
              {icon}
              {text}
            </Link>
          </li>
        ))}
        {logout && (
          <li>
            <button onClick={logout}>
              <LogoutIcon className="w-4 h-4" />
              Log out
            </button>
          </li>
        )}
      </ul>

      <Link
        href="/"
        className="flex gap-2 justify-center items-center p-4 prose link link-hover"
      >
        <Scrawl size={24} />
        <h2 className="font-heading">Scrawl</h2>
      </Link>
    </div>
  )
}

export default Nav
