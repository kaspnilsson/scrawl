import { PlusIcon } from '@heroicons/react/outline'
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import { Project } from '../../interfaces/project'
import { fetcher, makeNoteKeyFromMoment } from '../../lib/apiHelpers'
import CreateProjectModal from '../../components/CreateProjectModal'
import Link from 'next/link'
import { routes } from '../../lib/routes'
import moment from 'moment'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const ProjectsIndex = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = (shouldFetch?: boolean) => {
    if (shouldFetch) mutate()
    setShowDialog(false)
  }

  // const [projectName, se]

  const { data, error, mutate } = useSWR<Project[]>('/api/projects', fetcher)

  return (
    <Layout loading={data === undefined} error={error}>
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <h1 className="flex gap-2 items-center pr-8 font-heading">
            Projects
          </h1>
          <button
            className="flex gap-2 items-center btn btn-outline btn-sm sm:btn-md"
            onClick={open}
          >
            <PlusIcon className="w-4 h-4" />
            Create a project
          </button>
        </div>
        <div className="flex items-center mt-4 w-full not-prose">
          <div className="overflow-hidden w-full md:rounded-lg">
            {data?.length && (
              <table
                className="table min-w-full border-separate table-compactsm:table-normal"
                style={{ borderSpacing: 0 }}
              >
                <thead className="text-sm bg-base-200">
                  <tr>
                    <th scope="col" className="sticky top-0 z-10 text-left">
                      Name
                    </th>
                    <th scope="col" className="font-semibold text-left">
                      Created
                    </th>
                    <th scope="col" className="font-semibold text-left">
                      Updated
                    </th>
                  </tr>
                </thead>
                {(data || [])
                  .sort(
                    (a: Project, b: Project) =>
                      new Date(b.updated_at).getUTCMilliseconds() -
                      new Date(a.updated_at).getUTCMilliseconds()
                  )
                  .map((d, index) => (
                    <Link passHref key={index} href={routes.project(d.name)}>
                      <tr className="hover">
                        <td className="whitespace-nowrap link">{d.name}</td>
                        <td className="whitespace-nowrap">
                          {d.created_at
                            ? makeNoteKeyFromMoment(moment(d.created_at))
                            : 'Unknown'}
                        </td>
                        <td className="whitespace-nowrap">
                          {d.updated_at
                            ? moment(d.updated_at).fromNow()
                            : 'Unknown'}
                        </td>
                      </tr>
                    </Link>
                  ))}
                {!data?.length && <tr className="placeholder">No projects!</tr>}
              </table>
            )}
          </div>
        </div>
      </div>
      <CreateProjectModal
        isOpen={showDialog}
        close={close}
        projects={data || []}
      />
    </Layout>
  )
}
export default ProjectsIndex
