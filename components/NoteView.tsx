import { JSONContent } from '@tiptap/core'
import { startOfToday } from 'date-fns'
import moment from '../lib/moment'
import { useCallback } from 'react'
import { makeNoteKeyFromMoment, postNote } from '../lib/apiHelpers'
import CalendarWeek from './CalendarWeek'
import Editor from './Editor'
import Layout from './Layout'
import { debounce } from 'lodash'
import Datepicker from './Datepicker'
import { useRouter } from 'next/router'
import { routes } from '../lib/routes'
import { Note } from '../interfaces/note'
import useSWR from 'swr'

interface Props {
  date: moment.Moment
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const NoteView = ({ date }: Props) => {
  const router = useRouter()
  const noteKey = makeNoteKeyFromMoment(date)

  const {
    data: note,
    error,
    // mutate,
  } = useSWR<Note>(`/api/notes/${noteKey}`, fetcher)
  const loading = note === undefined

  const today = moment(startOfToday())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostNote = useCallback(
    debounce(async (content: JSONContent) => {
      await postNote(noteKey, { ...note, content })
      // await mutate()
    }, 500),
    []
  )

  const handleUpdate = (content: JSONContent) => {
    debouncedPostNote(content)
  }

  return (
    <Layout
      headerContent={<CalendarWeek selectedDate={date} />}
      loading={loading}
      error={error}
    >
      {!loading && !error && (
        <div className="m-auto prose prose-stone prose-headings:m-0 min-w-[300px] prose-headings:font-heading">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase mb-0.5">
              {date.format('dddd')}
              {date.isSame(today, 'date') && (
                <span className="badge-accent badge">today</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading">{date.format('MMM D, YYYY')}</h1>
              <Datepicker
                selectedDate={date.toDate()}
                onDateSelect={(date) =>
                  router.push(routes.notesForMoment(moment(date)))
                }
              />
            </div>
          </div>
          <div className="flex items-center w-full mt-4">
            <Editor
              className="w-full min-h-[400px]"
              content={note?.content}
              onUpdate={handleUpdate}
              noteDate={noteKey}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default NoteView
