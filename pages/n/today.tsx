import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import NoteView from '../../components/NoteView'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
})

const Today = () => {
  const today = moment(new Date())
  return <NoteView date={today} />
}
export default Today
