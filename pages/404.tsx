import Layout from '../components/Layout'

const FourOhFour = () => {
  return (
    <Layout>
      <div className="m-auto prose prose-headings:m-0 prose-headings:font-heading">
        <div className="flex justify-center items-center py-16 m-auto h-full">
          {/* <div className="flex items-center text-sm font-semibold uppercase">
            {date.format('dddd')}
            {date.isSame(today) && (
              <>
                <div className="mx-1 my-auto w-2 h-3 divider-horizontal divider"></div>
                <span className="text-primary-content">today</span>
              </>
            )}
          </div> */}
          <h1 className="flex gap-2 items-center font-heading">404</h1>
          <div className="divider divider-horizontal" />
          <span>Page not found.</span>
        </div>
      </div>
    </Layout>
  )
}
export default FourOhFour
