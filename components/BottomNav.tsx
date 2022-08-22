import {
  SunIcon,
  CalendarIcon,
  BriefcaseIcon,
  MenuAlt2Icon,
} from '@heroicons/react/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useIsHydrated } from '../contexts/isHydrated'
import { routes } from '../lib/routes'
import Link from './Link'

const LINKS = [
  { icon: <SunIcon className="w-5 h-5" />, route: routes.today },
  {
    icon: <CalendarIcon className="w-5 h-5" />,
    route: routes.calendar,
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5" />,
    route: routes.projects,
  },
]

interface Props {
  leftSidebarEnabled: boolean
  toggleLeftSidebar: () => void
}

const BottomNav = ({ leftSidebarEnabled, toggleLeftSidebar }: Props) => {
  const isHydrated = useIsHydrated()
  const router = useRouter()

  return (
    <div className="grid grid-cols-4 gap-2 px-1 border-t btm-nav sm:hidden border-base-300 btm-nav-sm">
      <button
        className={classNames('flex-1 min-w-0 btn btn-sm btn-ghost', {
          'btn-active': isHydrated && leftSidebarEnabled,
        })}
        onClick={toggleLeftSidebar}
      >
        <MenuAlt2Icon className="w-5 h-5" />
      </button>
      {LINKS.map(({ icon, route }, index) => (
        <Link key={index} href={route} className="flex-1 min-w-0">
          <button
            className={classNames('btn btn-sm btn-ghost w-full', {
              'btn-active': router.pathname === route,
            })}
          >
            {icon}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default BottomNav
