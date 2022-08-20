// Individual project root
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import ProjectView from '../../../components/ProjectView'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    const { name } = ctx.query
    return { props: { name } }
  },
})

interface Props {
  name: string
}

const IndividualProjectView = ({ name }: Props) => <ProjectView name={name} />
export default IndividualProjectView
