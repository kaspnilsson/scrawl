import {
  SunIcon,
  CalendarIcon,
  BriefcaseIcon,
  LogoutIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useUserContext } from '../contexts/userProfile'
import { routes } from '../lib/routes'
import Scrawl from './icons/Scrawl'
import Link from './Link'

const LINKS = [
  { text: 'Today', icon: <SunIcon className="w-4 h-4" />, route: routes.today },
  {
    text: 'Calendar',
    icon: <CalendarIcon className="w-4 h-4" />,
    route: routes.calendar,
  },
  {
    text: 'Projects',
    icon: <BriefcaseIcon className="w-4 h-4" />,
    route: routes.projects,
  },
]

const Nav = () => {
  const { logout } = useUserContext()
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between h-full gap-2 w-fit">
      <ul className="flex w-56 p-2 menu menu-compact">
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
        className="flex items-center justify-center gap-2 p-4 prose link link-hover"
      >
        <Scrawl size={24} />
        <h2 className="font-heading">Scrawl</h2>
      </Link>
    </div>
  )
}

export default Nav
