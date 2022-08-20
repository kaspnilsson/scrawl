import { Content } from '@tiptap/core'
import { useCallback, useEffect, useState } from 'react'
import { postProject } from '../lib/apiHelpers'
import Layout from './Layout'
import { debounce } from 'lodash'
import { Project } from '../interfaces/project'
import SimpleEditorComponent from './SimpleEditor'

interface Props {
  name: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProjectView = ({ name }: Props) => {
  const [project, setProject] = useState<Project | null>(null)
  // const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostProject = useCallback(
    debounce(async (value: Content) => {
      // setSaving(true)
      await postProject(name, { ...project, description: value })
      // setSaving(false)
    }, 500),
    []
  )

  const handleUpdate = (content: Content) => {
    debouncedPostProject(content)
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setError(undefined)
        setLoading(true)
        const res = await fetcher(`/api/projects/${name}`)
        setProject(res)
      } catch (e: unknown) {
        setError(e as Error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [name])

  return (
    <Layout loading={loading} error={error}>
      {!loading && !error && (
        <div className="m-auto prose prose-stone prose-headings:m-0 prose-headings:font-heading">
          <div>
            <h1 className="flex flex-wrap gap-3 items-center font-heading">
              {name}
            </h1>
          </div>
          <div className="flex items-center mt-4 w-full">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text font-heading">Description</span>
              </label>
              <SimpleEditorComponent
                onUpdate={handleUpdate}
                content={project?.description || ''}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-heading">Tasks</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
export default ProjectView
