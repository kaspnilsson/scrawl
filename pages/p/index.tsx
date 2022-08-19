import { PlusIcon } from '@heroicons/react/outline'
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import { Project } from '../../interfaces/project'
import { fetcher } from '../../lib/apiHelpers'
import Modal from '../../components/Modal'

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
  const close = () => setShowDialog(false)

  const { data, error } = useSWR<Project[]>('/api/projects', fetcher)

  return (
    <Layout loading={data === undefined} error={error}>
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 pr-8 font-heading">
            Projects
          </h1>
          <button
            className="flex items-center gap-2 btn btn-outline btn-sm sm:btn-md"
            onClick={open}
          >
            <PlusIcon className="w-4 h-4" />
            Create a project
          </button>
        </div>
        <div className="flex items-center w-full mt-4">
          {data?.map((d, index) => (
            <span key={index}>{JSON.stringify(d)}</span>
          ))}
          {!data?.length && <div className="placeholder">No projects!</div>}
        </div>
      </div>
      <Modal isOpen={showDialog} close={close} />
    </Layout>
  )
}
export default ProjectsIndex
