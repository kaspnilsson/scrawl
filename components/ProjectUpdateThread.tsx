import { PencilIcon } from '@heroicons/react/solid'
import { ProjectUpdate } from '../interfaces/projectUpdate'
import { routes } from '../lib/routes'
import Link from './Link'
import ProjectUpdateEditor from './ProjectUpdateEditor'

interface Props {
  updates?: ProjectUpdate[]
}

const ProjectUpdateThread = ({ updates = [] }: Props) => {
  return (
    <ol className="relative p-0 list-none sm:border-l border-normal">
      {updates.map((u) => (
        <li
          className="px-4 py-2 mb-10 rounded-xl sm:ml-4 sm:px-8 sm:py-4 bg-base-200"
          key={u.id}
        >
          <div className="hidden absolute -left-2 w-4 h-4 rounded-full ring-8 bg-accent border-normal sm:flex ring-base-100"></div>
          <Link href={routes.notesForDate(u.note_date)}>
            <div className="flex gap-1 items-center text-sm deemphasized">
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
    </ol>
  )
}

export default ProjectUpdateThread
