import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import { Project } from '../../interfaces/project'
import { fetcher } from '../../lib/apiHelpers'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const TasksIndex = () => {
  const { data, error } = useSWR<Project[]>('/api/tasks', fetcher)

  return (
    <Layout
      loading={data === undefined}
      error={error}
      noMaxWidth={true}
      headerContent={
        <div className="flex flex-wrap justify-between items-center pl-2">
          <h3 className="flex gap-2 items-center m-0 font-heading">Tasks</h3>
        </div>
      }
    >
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading max-w-none">
        WIP
        <div className="divider divider-horizontal" />
        <div className="pre">{JSON.stringify(data)}</div>
      </div>
    </Layout>
  )
}
export default TasksIndex
