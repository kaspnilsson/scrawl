import { PencilIcon } from '@heroicons/react/solid'
import { Project } from '../interfaces/project'
import { ProjectUpdate } from '../interfaces/projectUpdate'
import { routes } from '../lib/routes'
import Link from './Link'
import ProjectUpdateEditor from './ProjectUpdateEditor'
import moment from '../lib/moment'
import { makeNoteKeyFromMoment } from '../lib/apiHelpers'

interface Props {
  project: Project
  updates?: ProjectUpdate[]
}

const ProjectUpdateThread = ({ updates = [], project }: Props) => {
  return (
    <ol className="relative p-0 list-none sm:border-l border-neutral">
      {updates.map((u) => (
        <li
          className="px-4 py-2 mb-10 rounded-xl sm:ml-4 sm:px-8 sm:py-4 bg-base-200"
          key={u.id}
        >
          <div className="absolute hidden w-4 h-4 rounded-full -left-2 ring-8 bg-accent border-neutral sm:flex ring-base-100"></div>
          <Link href={routes.notesForDate(u.note_date)}>
            <div className="flex items-center gap-1 text-sm deemphasized">
              {u.note_date}
              <PencilIcon className="w-3 h-3" />
            </div>
          </Link>
          <ProjectUpdateEditor
            content={{
              type: 'doc',
              content: u.content,
            }}
            projectName={u.project_name}
            noteDate={u.note_date}
            onUpdate={() => null}
            editable={false}
          />
        </li>
      ))}
      <li className="px-4 py-2 mb-10 rounded-xl sm:ml-4 sm:px-8 sm:py-4 bg-base-200">
        <div className="absolute hidden w-4 h-4 rounded-full -left-2 ring-8 bg-accent border-neutral sm:flex ring-base-100"></div>
        <div className="flex items-center gap-1 text-sm deemphasized">
          {makeNoteKeyFromMoment(moment(project.created_at))}
        </div>
        Project created
      </li>
    </ol>
  )
}

export default ProjectUpdateThread
