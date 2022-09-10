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
      <div className="m-auto prose-sm prose prose-headings:m-0 prose-headings:font-heading sm:prose-md">
        <div className="flex items-center justify-center h-full py-16 m-auto">
          <div className="flex p-16 m-auto loading btn btn-ghost">
            Logging out
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Logout
