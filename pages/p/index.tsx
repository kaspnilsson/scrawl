import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import Layout from '../../components/Layout'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const ProjectsIndex = () => {
  return (
    <Layout>
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading">
        <div>
          {/* <div className="flex items-center text-sm font-semibold uppercase">
      {date.format('dddd')}
      {date.isSame(today) && (
        <>
          <div className="w-2 h-3 mx-1 my-auto divider-horizontal divider"></div>
          <span className="text-primary-content">today</span>
        </>
      )}
    </div> */}
          <h1 className="flex items-center gap-2 font-heading">Projects</h1>
        </div>
        <div className="flex items-center w-full mt-4">TODO</div>
      </div>
    </Layout>
  )
}
export default ProjectsIndex
