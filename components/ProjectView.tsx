import { JSONContent } from '@tiptap/core'
import { useCallback, useState } from 'react'
import { deleteProject, postProject } from '../lib/apiHelpers'
import Layout from './Layout'
import { debounce } from 'lodash'
import { Project } from '../interfaces/project'
import SimpleEditorComponent from './SimpleEditor'
import ProjectStateChip from './ProjectStateChip'
import AccordionPanel from './AccordionPanel'
import ProjectUpdateThread from './ProjectUpdateThread'
import ProjectActivityCalendar from './ProjectActivityCalendar'
import useSWR from 'swr'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { routes } from '../lib/routes'

interface Props {
  name: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProjectView = ({ name }: Props) => {
  const [fetching, setFetching] = useState(false)
  const {
    data: project,
    error,
    // mutate,
  } = useSWR<Project>(`/api/projects/${name}?withUpdates=true`, fetcher)
  const loading = project === undefined || fetching

  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostProject = useCallback(
    debounce(async (value: JSONContent) => {
      await postProject(name, { ...project, description: value })
    }, 500),
    []
  )

  const handleUpdate = (content: JSONContent) => {
    debouncedPostProject(content)
  }

  const handleDelete = async () => {
    setFetching(true)
    await deleteProject(name)
    await router.push(routes.projects)
    setFetching(false)
  }

  return (
    <Layout
      loading={loading}
      error={error}
      headerContent={
        !!project && (
          <div className="flex items-center justify-between w-full gap-3 px-2">
            <div className="flex items-center gap-2">
              <h3 className="flex items-center gap-3 m-0 font-heading">
                {name}
              </h3>
              <ProjectStateChip state={project?.state} />
            </div>
            <div className="flex dropdown dropdown-end dropdown-hover">
              <button className="btn btn-ghost btn-square btn-sm">
                <DotsVerticalIcon className="w-4 h-4" />
              </button>
              <ul
                className="w-64 p-2 overflow-auto shadow max-h-96 dropdown-content menu bg-base-100 rounded-box menu-compact min-w-fit"
                tabIndex={0}
              >
                <li>
                  <button onClick={handleDelete}>
                    Delete project (irreversible!)
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )
      }
    >
      {project && (
        <div className="m-auto prose prose-stone prose-headings:m-0 prose-headings:font-heading">
          <div className="flex flex-col w-full mt-4 space-y-4">
            <SimpleEditorComponent
              className="w-full"
              onUpdate={handleUpdate}
              content={project?.description || null}
              placeholder="Add project description (optional)"
            />
            <AccordionPanel
              defaultOpen
              title={<h3>Activity</h3>}
              className="w-full"
            >
              <ProjectActivityCalendar project={project} />
            </AccordionPanel>
            <AccordionPanel
              defaultOpen
              title={<h3>Updates</h3>}
              className="w-full"
            >
              <ProjectUpdateThread
                updates={project?.updates}
                project={project}
              />
            </AccordionPanel>
            {/* <AccordionPanel
              defaultOpen
              title={<h3>Tasks</h3>}
              className="w-full"
            ></AccordionPanel> */}
            {/* <AccordionPanel defaultOpen title="Tasks" className="w-full">
              <SimpleEditorComponent
                className=""
                onUpdate={handleUpdate}
                content={project?.description || ''}
              />
            </AccordionPanel> */}
          </div>
        </div>
      )}
    </Layout>
  )
}
export default ProjectView
