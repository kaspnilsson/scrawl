import { JSONContent } from '@tiptap/core'
import { useCallback, useState } from 'react'
import { deleteProject, postProject, postTask } from '../lib/apiHelpers'
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
import { Task } from '../interfaces/task'
import TaskTable from './TaskTable'

interface Props {
  name: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProjectView = ({ name }: Props) => {
  const [fetching, setFetching] = useState(false)
  const {
    data: project,
    error: projectError,
    mutate: mutateProject,
  } = useSWR<Project>(`/api/projects/${name}?withUpdates=true`, fetcher)
  const loading = project === undefined || fetching

  const {
    data: tasks,
    error: tasksError,
    mutate: mutateTasks,
  } = useSWR<Task[]>(`/api/tasks?projectName=${name}`, fetcher)

  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostProject = useCallback(
    debounce(async (value: JSONContent) => {
      if (!project) return
      const newProject = { ...project, description: value }
      await mutateProject(newProject)
      await postProject(name, newProject)
    }, 500),
    [project]
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

  const updateTask = async (t: Task) => {
    await mutateTasks(
      tasks?.map((task) => (task.id === t.id ? t : task)),
      false
    )
    await postTask(t.id, t)
  }

  return (
    <Layout
      loading={loading}
      error={projectError || tasksError}
      headerContent={
        !!project && (
          <div className="flex gap-3 justify-between items-center px-2 w-full">
            <div className="flex gap-2 items-center">
              <h3 className="flex gap-3 items-center m-0 font-heading">
                {name}
              </h3>
              <ProjectStateChip state={project?.state} />
            </div>
            <div className="flex dropdown dropdown-end dropdown-hover">
              <button className="btn btn-ghost btn-square btn-sm">
                <DotsVerticalIcon className="w-4 h-4" />
              </button>
              <ul
                className="overflow-auto p-2 w-64 max-h-96 shadow dropdown-content menu bg-base-100 rounded-box menu-compact min-w-fit"
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
          <div className="flex flex-col mt-4 space-y-4 w-full">
            <SimpleEditorComponent
              className="w-full"
              onUpdate={handleUpdate}
              content={project?.description || null}
              placeholder="Add project description (optional)"
            />
            <AccordionPanel
              defaultOpen
              title={<h3>Tasks</h3>}
              className="w-full"
            >
              <TaskTable data={tasks || []} updateTask={updateTask}></TaskTable>
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
            <AccordionPanel
              defaultOpen
              title={<h3>Activity</h3>}
              className="w-full"
            >
              <ProjectActivityCalendar project={project} />
            </AccordionPanel>
          </div>
        </div>
      )}
    </Layout>
  )
}
export default ProjectView
