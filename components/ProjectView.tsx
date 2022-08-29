import { JSONContent } from '@tiptap/core'
import { useCallback } from 'react'
import { postProject } from '../lib/apiHelpers'
import Layout from './Layout'
import { debounce } from 'lodash'
import { Project } from '../interfaces/project'
import SimpleEditorComponent from './SimpleEditor'
import ProjectStateChip from './ProjectStateChip'
import AccordionPanel from './AccordionPanel'
import ProjectUpdateThread from './ProjectUpdateThread'
import ProjectActivityCalendar from './ProjectActivityCalendar'
import useSWR from 'swr'

interface Props {
  name: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProjectView = ({ name }: Props) => {
  const {
    data: project,
    error,
    // mutate,
  } = useSWR<Project>(`/api/projects/${name}`, fetcher)
  const loading = project === undefined

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

  return (
    <Layout loading={loading} error={error}>
      {project && (
        <div className="m-auto prose prose-stone prose-headings:m-0 prose-headings:font-heading">
          <div className="flex flex-wrap items-center w-full gap-3">
            <h1 className="flex flex-wrap items-center gap-3 font-heading">
              {name}
            </h1>
            <ProjectStateChip state={project?.state} />
          </div>
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
              <ProjectUpdateThread updates={project?.updates} />
            </AccordionPanel>
            <AccordionPanel
              defaultOpen
              title={<h3>Tasks</h3>}
              className="w-full"
            ></AccordionPanel>
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
