import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import Layout from '../components/Layout'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const Calendar = () => {
  return (
    <Layout>
      <div className="m-auto prose prose-headings:m-0 prose-headings:font-heading">
        <div>
          {/* <div className="flex items-center text-sm font-semibold uppercase">
            {date.format('dddd')}
            {date.isSame(today) && (
              <>
                <div className="mx-1 my-auto w-2 h-3 divider-horizontal divider"></div>
                <span className="text-primary-content">today</span>
              </>
            )}
          </div> */}
          <h1 className="flex gap-2 items-center font-heading">Calendar</h1>
        </div>
        <div className="flex items-center mt-4 w-full">TODO</div>
      </div>
    </Layout>
  )
}
export default Calendar
