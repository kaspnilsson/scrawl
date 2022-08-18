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
  return <Layout>TODO</Layout>
}
export default Calendar
