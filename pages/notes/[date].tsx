import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import NoteView from '../../components/NoteView'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    const { date } = ctx.query

    return { props: { date } }
  },
})

interface Props {
  date: string
}

const NotesForDay = ({ date }: Props) => {
  return <NoteView date={moment(date)} />
}
export default NotesForDay
