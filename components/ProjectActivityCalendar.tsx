import { useRouter } from 'next/router'
import ActivityCalendar, { CalendarData } from 'react-activity-calendar'
import ReactTooltip from 'react-tooltip'
import { Project } from '../interfaces/project'
import { ProjectUpdate } from '../interfaces/projectUpdate'
import { makeNoteKeyFromMoment } from '../lib/apiHelpers'
import moment from '../lib/moment'
import { routes } from '../lib/routes'

interface Props {
  project?: Project
  loading?: boolean
}

const ProjectActivityCalendar = ({ project, loading = false }: Props) => {
  const activityData: CalendarData = []
  const router = useRouter()

  if (project) {
    const sixMonthsAgo = moment().subtract(6, 'months')
    const fourMonthsAgo = moment().subtract(4, 'months')
    const beginning = moment(project.created_at)
    const range = moment.range(
      moment.max(moment.min(sixMonthsAgo, beginning), fourMonthsAgo),
      moment()
    )
    const updatesByDate: { [date: string]: ProjectUpdate } = {}
    if (project?.updates?.length) {
      for (const u of project.updates) {
        updatesByDate[u.note_date] = u
      }
    }

    for (const day of range.by('days')) {
      const date = makeNoteKeyFromMoment(day)
      activityData.push({
        date,
        count: updatesByDate[date] ? 1 : 0,
        level: updatesByDate[date] ? 4 : 1,
      })
    }
  }
  return (
    <div className="flex items-center p-2 card bg-base-200 sm:p-4">
      <style jsx>
        {`
          .react-activity-calendar rect {
            cursor: pointer;
          }
        `}
      </style>
      <ActivityCalendar
        loading={loading}
        data={activityData}
        labels={{
          legend: {
            less: 'Less',
            more: 'More',
          },
          months: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          tooltip:
            '<strong class="font-bold text-accent">{{count}} update(s)</strong> on {{date}}',
          totalCount: '{{count}} updates',
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }}
        // blockMargin={5}
        // blockRadius={7}
        // blockSize={14}
        theme={{
          level0: 'hsla(var(--b1))',
          level1: 'hsla(var(--a) / .1)',
          level2: 'hsla(var(--a) / .4)',
          level3: 'hsla(var(--a) / .7)',
          level4: 'hsla(var(--a) / 1)',
        }}
        eventHandlers={{
          onClick: () => (data) => router.push(routes.notesForDate(data.date)),
        }}
      >
        <ReactTooltip html />
      </ActivityCalendar>
    </div>
  )
}

export default ProjectActivityCalendar
