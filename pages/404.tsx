import Layout from '../components/Layout'

const FourOhFour = () => {
  return (
    <Layout>
      <div className="m-auto prose-sm prose prose-headings:m-0 prose-headings:font-heading sm:prose-md">
        <div className="flex items-center justify-center h-full py-16 m-auto">
          <h1 className="flex items-center gap-2 font-heading">404</h1>
          <div className="divider divider-horizontal" />
          <span>Page not found.</span>
        </div>
      </div>
    </Layout>
  )
}
export default FourOhFour
