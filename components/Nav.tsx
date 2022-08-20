import {
  SunIcon,
  CalendarIcon,
  BriefcaseIcon,
  LogoutIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
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
  {
    text: 'Tasks',
    icon: <CheckCircleIcon className="w-4 h-4" />,
    route: routes.tasks,
  },
]

const Nav = () => {
  const { logout } = useUserContext()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 justify-between h-screen w-fit">
      <ul className="flex gap-1 p-2 w-56 menu menu-compact">
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
            <a onClick={logout}>
              <LogoutIcon className="w-4 h-4" />
              Log out
            </a>
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
