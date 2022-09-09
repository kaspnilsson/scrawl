import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { logoutServerside } from '../lib/apiHelpers'
import { routes } from '../lib/routes'

const Logout = () => {
  const router = useRouter()
  useEffect(() => {
    logoutServerside().then(() => router.push(routes.login))
  }, [router])

  return (
    <Layout>
      <div className="m-auto prose prose-headings:m-0 prose-headings:font-heading">
        <div className="flex justify-center items-center py-16 m-auto h-full">
          <div className="flex p-16 m-auto loading btn btn-ghost">
            Logging out
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Logout