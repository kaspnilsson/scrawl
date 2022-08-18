import classNames from 'classnames'
import { previousSunday, isSameDay, startOfToday } from 'date-fns'
import moment, { Moment } from 'moment'
import { routes } from '../lib/routes'
import Link from './Link'

interface Props {
  selectedDate: Moment
}

const CalendarWeek = ({ selectedDate }: Props) => {
  const selectedDateAsDate = new Date(selectedDate.toISOString())
  const lastSunday = previousSunday(
    new Date(selectedDateAsDate).setDate(selectedDateAsDate.getDate() + 1)
  )
  const today = startOfToday()

  const buttons = []
  const date = lastSunday
  for (let i = 0; i < 7; i++) {
    buttons.push({
      moment: moment(date),
      isSelected: isSameDay(date, selectedDateAsDate),
      isInPast: date < today,
    })
    date.setDate(date.getDate() + 1)
  }

  return (
    <div className="flex flex-1 gap-1 m-auto prose">
      {buttons.map((b, index) => (
        <Link
          href={routes.notesForMoment(b.moment)}
          key={index}
          className="flex-1 no-underline"
        >
          <button
            className={classNames(
              'btn not-prose flex flex-col min-w-fit md:btn-block h-fit min-h-0 py-1',
              {
                'btn-ghost': !b.isSelected,
                'btn-accent': b.isSelected,
                'opacity-50': b.isInPast && !b.isSelected,
              }
            )}
          >
            <div className="text-2xs">{b.moment.format('ddd')}</div>
            <div className="text-base leading-none font-heading">
              {b.moment.format('D')}
            </div>
          </button>
        </Link>
      ))}
    </div>
  )
}

export default CalendarWeek
