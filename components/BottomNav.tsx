import { SunIcon, BriefcaseIcon, MenuAlt2Icon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { routes } from '../lib/routes'
import Link from './Link'

const LINKS = [
  {
    icon: <SunIcon className="w-5 h-5 prose prose-stone" />,
    route: routes.today,
  },
  // {
  //   icon: <CalendarIcon className="w-5 h-5 prose prose-stone" />,
  //   route: routes.calendar,
  // },
  {
    icon: <BriefcaseIcon className="w-5 h-5 prose prose-stone" />,
    route: routes.projects,
  },
]

interface Props {
  leftSidebarEnabled: boolean
  toggleLeftSidebar: () => void
}

const BottomNav = ({ toggleLeftSidebar, leftSidebarEnabled }: Props) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-3 gap-2 px-1 border-t btm-nav sm:hidden border-neutral btm-nav-sm">
      <button
        className="flex-1 min-w-0 btn btn-sm btn-ghost"
        onClick={toggleLeftSidebar}
      >
        {leftSidebarEnabled ? (
          <i className="font-thin ri-lg ri-side-bar-fill" />
        ) : (
          <i className="font-thin ri-lg ri-side-bar-line" />
        )}
      </button>
      {LINKS.map(({ icon, route }, index) => (
        <Link key={index} href={route} className="flex-1 min-w-0">
          <button
            className={classNames(
              'btn btn-sm btn-ghost w-full prose prose-stone',
              {
                'btn-active': router.pathname === route,
              }
            )}
          >
            {icon}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default BottomNav
