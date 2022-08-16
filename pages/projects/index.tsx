import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import Editor from '../components/Editor'
import Layout from '../components/Layout'
import NoteEditor from '../components/NoteEditor'
import { getRange } from '../lib/dateHelpers'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const ProjectIndex = () => {
  // One year
  const dates = getRange(
    new Date(),
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    'days'
  )
  return (
    <Layout>
      <div className="m-auto prose">
        <div>
          <h2 className="!m-0 text-2xl">
            {moment(new Date()).format('MMMM Do, YYYY')}
          </h2>
        </div>
        <div className="flex items-center w-full">
          <Editor
            className="w-full min-h-[400px]"
            content={'test content'}
            onUpdate={(content) => null}
          />
        </div>
        {/* <div className="grid grid-cols-1 justify-center items-center p-16">
        {dates.map((d, index) => {
          return (
            <div key={index} className="pt-8">
              <div className="w-full font-semibold border-b border-border text-primary-500">
                <div>{d.format('MMM Do YY [ | ] dddd')}</div>
              </div>
            </div>
          )
        })}
      </div> */}
      </div>
    </Layout>
  )
}
export default ProjectIndex
