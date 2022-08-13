import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import Layout from '../components/Layout'
import { getRange } from '../lib/dateHelpers'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const Index = () => {
  // One year
  const dates = getRange(
    new Date(),
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    'days'
  )
  return (
    <Layout>
      <div className="grid grid-cols-1 justify-center items-center p-16">
        {dates.map((d, index) => {
          return (
            <div key={index} className="pt-8">
              <div className="w-full font-semibold border-b border-black text-stone-500">
                <div>{d.format('MMM Do YY [ | ] dddd')}</div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
export default Index
